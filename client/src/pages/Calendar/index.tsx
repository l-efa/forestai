import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import { currentMonth, currentYear } from "@/utils/dates";
import { useState } from "react";
import ReminderForm from "./ReminderForm";

export default function Calendar() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const [selectedDate, setSelectedDate] = useState<string>("");

  const [openReminderForm, setOpenReminderForm] = useState(false);

  const [reminder, setReminder] = useState("");

  const offset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const leading = Array.from({ length: offset }, (_, i) => ({
    day: daysInPrevMonth - offset + i + 1,
    current: false,
  }));

  const current = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    current: true,
  }));

  const trailing = Array.from(
    { length: (7 - ((leading.length + current.length) % 7)) % 7 },
    (_, i) => ({ day: i + 1, current: false }),
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
    setOpenReminderForm(false);
  };

  console.log(selectedDate, month, year);

  console.log(reminder);

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
          {cells.map((day, i) => (
            <div
              key={i}
              className="aspect-square border border-surface-border p-1"
              onClick={() => day.current && handleSelectedDate(day)}
            >
              <span className={!day.current ? "opacity-30" : ""}>
                {day.day}
              </span>
            </div>
          ))}
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
        />
      )}
    </div>
  );
}
