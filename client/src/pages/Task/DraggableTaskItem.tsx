import type { Cards } from "@/api/project";
import { formatDueDate } from "@/utils/format";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import { EditTaskForm } from "./TaskForm/EditTaskForm";

interface TaskItemProps {
  task: Cards;
  index: number;
  tableId: string;
}

export default function TaskItem({ task, index, tableId }: TaskItemProps) {
  const [showEditTaskMenu, setShowEditTaskMenu] = useState(false);
  const [editTaskName, setEditTaskName] = useState(task.title);
  const [editTaskDescription, setEditTaskDescription] = useState(
    task.description,
  );

  const { ref, isDragSource } = useSortable({
    id: task.id,
    index,
    type: `task-${tableId}`,
    data: { tableId },
    accept: [`task-${tableId}`],
  });

  const toggleEditForm = () => {
    setShowEditTaskMenu((prev) => !prev);
  };

  return (
    <div>
      <li
        ref={ref}
        style={{ visibility: isDragSource ? "hidden" : undefined }}
        onClick={toggleEditForm}
      >
        <div className="flex flex-col gap-2 rounded bg-surface-card p-3">
          <p className="text-[13px] text-forest-400">{task.title}</p>
          <p className="text-[11px]">{task.description}</p>
          <p>{task.dueDate && formatDueDate(task.dueDate)}</p>
        </div>
      </li>
      {showEditTaskMenu &&
        createPortal(
          <EditTaskForm
            toggleForm={toggleEditForm}
            taskName={editTaskName}
            taskDescription={editTaskDescription ?? ""}
            taskId={task.id}
            editTaskName={setEditTaskName}
            editTaskDescription={setEditTaskDescription}
          />,
          document.body,
        )}
    </div>
  );
}
