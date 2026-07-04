import type { Tasks } from "@/api/project";
import { OptimisticSortingPlugin } from "@dnd-kit/dom/sortable";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import EditTableForm from "./EditTableForm";
import NewTaskForm from "./TaskForm/NewTaskForm";
import TaskItem from "./DraggableTaskItem";
import { useDroppable } from "@dnd-kit/react";

export default function TableItem({
  table,
  index,
}: {
  table: Tasks;
  index: number;
}) {
  const { ref, handleRef, isDragSource } = useSortable({
    id: table.id,
    index,
    type: "Table",
    accept: ["Table"],
    plugins: (defaults) => defaults.filter((p) => p !== OptimisticSortingPlugin),
  });

  const { ref: dropRef } = useDroppable({
    id: `drop-${table.id}`,
    data: { tableId: table.id },
    accept: ["Task"],
  });
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTableName, setEditTableName] = useState(table.name);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const toggleNewTaskForm = () => {
    setShowNewTaskForm((prev) => !prev);
  };

  return (
    <li ref={ref} style={{ visibility: isDragSource ? "hidden" : undefined }}>
      <div className="flex w-64 flex-shrink-0 flex-col gap-2 bg-black p-3">
        <div className="flex cursor-pointer items-center text-sm font-semibold capitalize text-content-soft">
          <div className="flex-1 p-2 hover:bg-surface-card">
            <p
              ref={handleRef}
              className="text-s cursor-grab"
              onClick={() => setShowEditForm(true)}
            >
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
          {table.cards && (
            <ul>
              {table.cards.map((card, index) => (
                <TaskItem
                  task={card}
                  index={index}
                  tableId={table.id}
                  key={`${table.id}-${card.id}`}
                />
              ))}
              {table.cards.length <= 0 && (
                <div
                  ref={dropRef}
                  className="rounded border border-dashed border-surface-divider p-3 text-center text-xs text-content-faint"
                >
                  drag here
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
      {showEditForm &&
        createPortal(
          <EditTableForm
            setShowEditTableForm={setShowEditForm}
            tableId={table.id}
            tableName={editTableName}
            setTableName={setEditTableName}
          />,
          document.body,
        )}

      {showNewTaskForm &&
        createPortal(
          <NewTaskForm toggleForm={toggleNewTaskForm} tableId={table.id} />,
          document.body,
        )}
    </li>
  );
}
