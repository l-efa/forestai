import { useEditReminderMutation } from "@/api/user";
import Button2 from "@/components/Button2";
import InputField from "@/components/InputField";
import { reminderColors } from "@/utils/avatarColors";
import { useState } from "react";

type editProps = {
  id: string;
  name: string;
  time: string | undefined;
  duration: number | undefined;
  color: string | undefined;
  toggleForm: () => void;
};

export default function EditForm({
  id,
  name,
  time,
  duration,
  color,
  toggleForm,
}: editProps) {
  const [newName, setNewName] = useState(name);
  const [newTime, setNewTime] = useState(time);
  const [newDuration, setNewDuration] = useState(duration);
  const [newColor, setNewColor] = useState(color);

  const [editReminder] = useEditReminderMutation();

  const updateReminder = async () => {
    await editReminder({
      reminderId: id,
      reminder: newName,
      time: newTime,
      duration: newDuration,
      color: newColor,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        e.stopPropagation();
        toggleForm();
      }}
    >
      <div
        className="flex w-80 flex-col gap-4 rounded-card bg-surface-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Edit reminder</p>
        <InputField
          name="reminder name..."
          value={newName}
          type="text"
          handleChange={setNewName}
        />
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-content-muted">
              Time (optional)
            </label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border-b border-content-primary bg-transparent pb-2 text-sm text-content-primary outline-none [color-scheme:dark]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-content-muted">Duration</label>
            <select
              value={newDuration}
              onChange={(e) => setNewDuration(Number(e.target.value))}
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
          <div className="flex flex-wrap gap-2">
            {Object.entries(reminderColors).map(([name, bg]) => (
              <button
                key={name}
                className={`h-5 w-5 rounded-full ${bg} ${newColor === name ? "ring-2 ring-white ring-offset-1 ring-offset-surface-card" : ""}`}
                onClick={() => setNewColor(name)}
              />
            ))}
          </div>
        </div>
        <Button2 name="Update" changeHandler={updateReminder} />
      </div>
    </div>
  );
}
