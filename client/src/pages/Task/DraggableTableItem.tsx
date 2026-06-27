import type { Tasks } from "@/api/project";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import EditTableForm from "./EditTableForm";

export default function TableItem({
  table,
  index,
}: {
  table: Tasks;
  index: number;
}) {
  const { ref } = useSortable({ id: table.id, index });
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTableName, setEditTableName] = useState(table.name);
  return (
    <li ref={ref}>
      <div className="flex w-64 flex-shrink-0 flex-col gap-2 rounded-card bg-surface-card p-3">
        <p
          className="cursor-pointer text-sm font-semibold capitalize text-content-soft"
          onClick={() => setShowEditForm(true)}
        >
          {table.name}
        </p>
        <div className="flex flex-col gap-2">{/* cards go here */}</div>
      </div>
      {showEditForm && (
        <EditTableForm
          setShowEditTableForm={setShowEditForm}
          tableId={table.id}
          tableName={editTableName}
          setTableName={setEditTableName}
        />
      )}
    </li>
  );
}
