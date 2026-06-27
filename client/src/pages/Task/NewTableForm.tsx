interface FormProps {
  tableName: string;
  setTableName: (value: string) => void;
  setShowNewTableForm: (value: boolean) => void;
  handleAddTable: () => void;
}

export default function NewTableForm({
  tableName,
  setTableName,
  setShowNewTableForm,
  handleAddTable,
}: FormProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={() => setShowNewTableForm(false)}
    >
      <div
        className="flex w-80 flex-col gap-4 rounded-card bg-surface-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-semibold text-content-primary">New Table</p>
        <input
          className="border-b border-content-primary bg-transparent pb-2 text-sm text-content-primary outline-none placeholder:text-content-faint"
          placeholder="Table name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm text-content-muted"
            onClick={() => setShowNewTableForm(false)}
          >
            Cancel
          </button>
          <button
            className="rounded-button bg-greenGradient px-6 py-2 text-sm font-bold text-surface-black"
            onClick={handleAddTable}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
