import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import { currentMonth, currentYear } from "@/utils/dates";
import { reminderColors } from "@/utils/avatarColors";

export const getEndTime = (time: string, duration: number) => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + duration;
  const endH = Math.floor(total / 60) % 24;
  const endM = total % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
};
import { useState } from "react";
import ReminderForm from "./ReminderForm";
import { useGetUserCalendarQuery, useNewReminderMutation } from "@/api/user";

export default function Calendar() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const [selectedDate, setSelectedDate] = useState<string>("");

  const [openReminderForm, setOpenReminderForm] = useState(false);

  const [reminder, setReminder] = useState("");
  const [reminderTime, setReminderTime] = useState(
    new Date().toTimeString().slice(0, 5),
  );
  const [reminderDuration, setReminderDuration] = useState(15);
  const [reminderColor, setReminderColor] = useState("green");

  const { data: reminders } = useGetUserCalendarQuery({ month, year });
  console.log(reminders);

  const [newReminder] = useNewReminderMutation();

  const offset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const leading = Array.from({ length: offset }, (_, i) => ({
    day: daysInPrevMonth - offset + i + 1,
    current: false,
    month: prevMonth,
    year: prevYear,
  }));

  const current = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    current: true,
    month,
    year,
  }));

  const trailing = Array.from(
    { length: (7 - ((leading.length + current.length) % 7)) % 7 },
    (_, i) => ({
      day: i + 1,
      current: false,
      month: nextMonth,
      year: nextYear,
    }),
  );

  const cells = [...leading, ...current, ...trailing];

  const handlePreviousMonth = () => {
    if (month === 0) {
      setYear((prev) => prev - 1);
      setMonth(11);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear((prev) => prev + 1);
      setMonth(0);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const handleToday = () => {
    setMonth(currentMonth);
    setYear(currentYear);
  };

  const handleSelectedDate = (date: any) => {
    setOpenReminderForm(true);
    if (date.current) {
      setSelectedDate(date.day);
    }
  };

  const handleCloseForm = () => {
    setReminder("");
    setReminderTime(new Date().toTimeString().slice(0, 5));
    setOpenReminderForm(false);
  };

  const handleNewReminder = async () => {
    await newReminder({
      date: selectedDate,
      month,
      year,
      reminder,
      reminderTime,
      duration: reminderDuration,
      color: reminderColor,
    });
    handleCloseForm();
  };

  console.log(reminders);

  return (
    <div className="flex flex-row">
      <main className="w-full max-w-4xl">
        <div>
          {new Date(year, month).toLocaleDateString("en-US", { month: "long" })}{" "}
          {year}
          <Button2 name="<" changeHandler={handlePreviousMonth} />
          <Button name="today" changeHandler={handleToday} />
          <Button2 name=">" changeHandler={handleNextMonth} />
        </div>
        <header className="grid grid-cols-7">
          {weekDays.map((day) => (
            <div key={day} className="border border-surface-border text-center">
              {day}
            </div>
          ))}
        </header>

        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const dayReminders = reminders
              ?.filter((r) => {
                const d = new Date(r.date);
                return (
                  d.getUTCDate() === day.day &&
                  d.getUTCMonth() === day.month &&
                  d.getUTCFullYear() === day.year
                );
              })
              ?.sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));

            return (
              <div
                key={i}
                className={`aspect-square overflow-hidden p-1 ${dayReminders?.length ? "border-2 border-forest-500" : "border border-surface-border"}`}
                onClick={() => day.current && handleSelectedDate(day)}
              >
                <span className={!day.current ? "opacity-30" : ""}>
                  {day.day}
                </span>
                {dayReminders?.map((r) => (
                  <p
                    key={r.id}
                    className={`my-0.5 truncate p-1 text-xs text-black ${r.color ? reminderColors[r.color] : "bg-forest-500"}`}
                  >
                    {r.time && (
                      <span>
                        {r.time}
                        {r.duration &&
                          ` - ${getEndTime(r.time, Number(r.duration))}`}{" "}
                      </span>
                    )}
                    {r.reminder}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </main>

      {openReminderForm && (
        <ReminderForm
          date={selectedDate}
          month={month}
          year={year}
          onCancel={handleCloseForm}
          reminder={reminder}
          setReminder={setReminder}
          handleNewReminder={handleNewReminder}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          reminders={reminders ?? []}
          duration={reminderDuration}
          setDuration={setReminderDuration}
          reminderColor={reminderColor}
          setReminderColor={setReminderColor}
        />
      )}

      <aside className="p-2">
        <p>upcoming</p>
        {(() => {
          const now = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);

          const isDay = (date: Date, ref: Date) => {
            const d = new Date(date);
            return (
              d.getUTCDate() === ref.getDate() &&
              d.getUTCMonth() === ref.getMonth() &&
              d.getUTCFullYear() === ref.getFullYear()
            );
          };

          const todayReminders = reminders?.filter((r) => isDay(r.date, now));
          const tomorrowReminders = reminders?.filter((r) =>
            isDay(r.date, tomorrow),
          );

          return (
            <>
              <div>
                <p className="text-xs text-content-muted">Today</p>
                {currentMonth === month &&
                  todayReminders?.map((r) => (
                    <p key={r.id} className="text-sm text-content-soft">
                      {r.time && r.duration && (
                        <span className="text-content-muted">
                          {r.time} -{" "}
                          {getEndTime(r.time, Number(r.duration))}{" "}
                        </span>
                      )}
                      {r.time && !r.duration && (
                        <span className="text-content-muted">{r.time} </span>
                      )}
                      {r.reminder}
                    </p>
                  ))}
              </div>
              <div>
                <p className="text-xs text-content-muted">Tomorrow</p>
                {currentMonth === month &&
                  tomorrowReminders?.map((r) => (
                    <p key={r.id} className="pb-4 text-sm text-content-soft">
                      {r.time && r.duration && (
                        <span className="text-content-muted">
                          {r.time} -{" "}
                          {getEndTime(r.time, Number(r.duration))}{" "}
                        </span>
                      )}
                      {r.time && !r.duration && (
                        <span className="text-content-muted">{r.time} </span>
                      )}
                      {r.reminder}
                    </p>
                  ))}
              </div>
            </>
          );
        })()}
      </aside>
    </div>
  );
}
