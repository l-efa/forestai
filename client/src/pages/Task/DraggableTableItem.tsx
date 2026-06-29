import type { Tasks } from "@/api/project";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import EditTableForm from "./EditTableForm";
import NewTaskForm from "./TaskForm/NewTaskForm";
import { formatDueDate } from "@/utils/format";

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

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const toggleNewTaskForm = () => {
    setShowNewTaskForm((prev) => !prev);
  };

  return (
    <li ref={ref}>
      <div className="flex w-64 flex-shrink-0 flex-col gap-2 bg-black p-3">
        <div className="flex cursor-pointer items-center text-sm font-semibold capitalize text-content-soft">
          <div className="flex-1 p-2 hover:bg-surface-card">
            <p className="text-s" onClick={() => setShowEditForm(true)}>
              {table.name}
            </p>
          </div>
          <span className="ml-auto flex items-center gap-1">
            <button
              className="bg-black px-2 py-1 text-2xl hover:text-emerald-400"
              onClick={(e) => {
                e.stopPropagation();
                toggleNewTaskForm();
              }}
            >
              +
            </button>
            <span className="bg-surface-card px-1 py-0 text-xs">
              {table.cards?.length}
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {table.cards &&
            table.cards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col gap-2 rounded bg-surface-card p-3"
              >
                <p className="text-[13px] text-forest-400">{card.title}</p>
                <p className="text-[11px]">{card.description}</p>
                <p>{card.dueDate && formatDueDate(card.dueDate)}</p>
              </div>
            ))}
        </div>
      </div>
      {showEditForm && createPortal(
        <EditTableForm
          setShowEditTableForm={setShowEditForm}
          tableId={table.id}
          tableName={editTableName}
          setTableName={setEditTableName}
        />,
        document.body
      )}

      {showNewTaskForm && createPortal(
        <NewTaskForm toggleForm={toggleNewTaskForm} tableId={table.id} />,
        document.body
      )}
    </li>
  );
}
