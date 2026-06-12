import InputField from "@/components/InputField";

interface ReminderFormProps {
  date: string;
  month: number;
  year: number;
  onCancel: () => void;
  reminder: string;
  setReminder: (value: string) => void;
  handleNewReminder: () => void;
}

export default function ReminderForm({
  date,
  month,
  year,
  onCancel,
  reminder,
  setReminder,
  handleNewReminder,
}: ReminderFormProps) {
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
          name="e.g Meetin at 2pm"
          type="text"
          value={reminder}
          handleChange={setReminder}
        />
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
      </div>
    </div>
  );
}
