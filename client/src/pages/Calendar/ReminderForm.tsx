import { useRemoveReminderMutation, type userCalendar } from "@/api/user";
import InputField from "@/components/InputField";
import { reminderColors } from "@/utils/avatarColors";

interface ReminderFormProps {
  date: string;
  month: number;
  year: number;
  onCancel: () => void;
  reminder: string;
  setReminder: (value: string) => void;
  handleNewReminder: () => void;
  reminderTime: string;
  setReminderTime: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  reminderColor: string;
  setReminderColor: (value: string) => void;
  reminders: userCalendar[];
}

export default function ReminderForm({
  date,
  month,
  year,
  onCancel,
  reminder,
  setReminder,
  handleNewReminder,
  reminderTime,
  setReminderTime,
  duration,
  setDuration,
  reminderColor,
  setReminderColor,
  reminders,
}: ReminderFormProps) {
  const [removeReminder] = useRemoveReminderMutation();

  const handleRemoveReminder = async (reminderId: string) => {
    await removeReminder({ reminderId });
  };

  const dayReminders = reminders.filter((r) => {
    const d = new Date(r.date);
    return (
      d.getUTCDate() === Number(date) &&
      d.getUTCMonth() === month &&
      d.getUTCFullYear() === year
    );
  });
  console.log("reminders: ", reminders);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex w-80 flex-col gap-4 rounded-card bg-surface-card p-6">
        <p className="font-semibold text-content-primary">
          New reminder for{" "}
          <span className="text-forest-400">
            {new Date(year, month).toLocaleDateString("en-US", {
              month: "long",
            })}{" "}
            {date}, {year}
          </span>
        </p>
        <InputField
          name="e.g Meeting at 2pm"
          type="text"
          value={reminder}
          handleChange={setReminder}
        />
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-content-muted">
              Time (optional)
            </label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="border-b border-content-primary bg-transparent pb-2 text-sm text-content-primary outline-none [color-scheme:dark]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-content-muted">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="border-b border-content-primary bg-transparent pb-2 text-sm text-content-primary outline-none"
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-content-muted">Color</label>
          <div className="flex gap-2">
            {Object.entries(reminderColors).map(([name, bg]) => (
              <button
                key={name}
                className={`h-5 w-5 rounded-full ${bg} ${reminderColor === name ? "ring-2 ring-white ring-offset-1 ring-offset-surface-card" : ""}`}
                onClick={() => setReminderColor(name)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm text-content-muted"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-button bg-greenGradient px-6 py-2 text-sm font-bold text-surface-black"
            onClick={handleNewReminder}
          >
            Add
          </button>
        </div>
        {dayReminders.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-2 text-sm text-content-soft"
          >
            <span onClick={() => handleRemoveReminder(r.id)}>x</span>
            {r.time && <span className="text-content-muted">{r.time}</span>}
            <span>{r.reminder}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
