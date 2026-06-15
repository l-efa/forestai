import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import { currentMonth, currentYear } from "@/utils/dates";
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
    });
    handleCloseForm();
  };

  console.log(reminders);

  return (
    <div>
      <p>Calendar</p>

      <div className="max-w-4xl">
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
            const dayReminders = reminders?.filter((r) => {
              const d = new Date(r.date);
              return (
                d.getUTCDate() === day.day &&
                d.getUTCMonth() === day.month &&
                d.getUTCFullYear() === day.year
              );
            });

            return (
              <div
                key={i}
                className={`aspect-square p-1 ${dayReminders?.length ? "border-2 border-forest-500" : "border border-surface-border"}`}
                onClick={() => day.current && handleSelectedDate(day)}
              >
                <span className={!day.current ? "opacity-30" : ""}>
                  {day.day}
                </span>
                {dayReminders?.map((r) => (
                  <p
                    key={r.id}
                    className="my-0.5 truncate bg-forest-500 p-1 text-xs text-black"
                  >
                    {r.time && <span>{r.time} </span>}
                    {r.reminder}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>

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
        />
      )}
    </div>
  );
}
