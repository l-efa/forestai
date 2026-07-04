import type { Cards } from "@/api/project";
import { formatDueDate } from "@/utils/format";
import { OptimisticSortingPlugin } from "@dnd-kit/dom/sortable";
import { useSortable } from "@dnd-kit/react/sortable";

interface TaskItemProps {
  task: Cards;
  index: number;
  tableId: string;
}

export default function TaskItem({ task, index, tableId }: TaskItemProps) {
  const { ref, isDragSource } = useSortable({
    id: task.id,
    index,
    type: "Task",
    data: { tableId },
    accept: ["Task"],
    plugins: (defaults) => defaults.filter((p) => p !== OptimisticSortingPlugin),
  });

  return (
    <li ref={ref} style={{ visibility: isDragSource ? "hidden" : undefined }}>
      <div className="flex flex-col gap-2 rounded bg-surface-card p-3">
        <p className="text-[13px] text-forest-400">{task.title}</p>
        <p className="text-[11px]">{task.description}</p>
        <p>{task.dueDate && formatDueDate(task.dueDate)}</p>
      </div>
    </li>
  );
}
