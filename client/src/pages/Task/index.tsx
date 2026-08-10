import {
  useAddTaskTableMutation,
  useGetTasksQuery,
  useOrderTaskCardsMutation,
  useOrderTaskTableMutation,
} from "@/api/project";
import Button2 from "@/components/Button2";
import { useOrgContext } from "@/context/OrgContext";
import { useProjectContext } from "@/context/ProjectContext";
import { useRef, useState } from "react";
import NewTableForm from "./NewTableForm";
import TableItem from "./DraggableTableItem";
import { arrayMove } from "@dnd-kit/helpers";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom";
import { formatDueDate } from "@/utils/format";

const sensors = [
  PointerSensor.configure({
    activationConstraints: [
      new PointerActivationConstraints.Distance({ value: 8 }),
    ],
  }),
];

export default function Task() {
  const project = useProjectContext();
  const org = useOrgContext();
  const [orderTables] = useOrderTaskTableMutation();

  const [newTableName, setNewTableName] = useState("");

  const [showNewTableForm, setShowNewTableForm] = useState(false);

  const overInfoRef = useRef<{
    id: string;
    tableId: string;
  } | null>(null);

  const [orderTasks] = useOrderTaskCardsMutation();

  const handleAddTable = async () => {
    if (newTableName.length < 1) {
      setShowNewTableForm(false);
      return;
    }
    addTable({
      orgId: org.org.id,
      projectId: project.projectData.id,
      name: newTableName,
    });
    setShowNewTableForm(false);
  };

  const handleOpenNewTableForm = () => {
    setNewTableName("");
    setShowNewTableForm(true);
  };

  const handleDragStart = () => {
    overInfoRef.current = null;
  };

  const handleDragOver = (event: any) => {
    const { source, target } = event.operation;

    if (!target) return;

    // drag task over table droppable (cross-table or empty table)
    if (source.type?.startsWith("task-") && !target.type && target.data?.tableId) {
      overInfoRef.current = { id: "", tableId: target.data.tableId };
      return;
    }

    if (source.type !== target.type) return;

    if (target.type === "Table" && source.id !== target.id) {
      overInfoRef.current = { id: target.id, tableId: "" };
    }

    if (target.type?.startsWith("task-") && source.id !== target.id) {
      overInfoRef.current = { id: target.id, tableId: target.data.tableId };
    }
  };

  const handleDragEnd = async (event: any) => {
    const { source, target } = event.operation;

    const overInfo = overInfoRef.current;

    if (overInfo == null || (overInfo.id !== "" && source.id === overInfo.id)) {
      overInfoRef.current = null;
      return;
    }

    if (!target || (target.type && source.type !== target.type)) {
      overInfoRef.current = null;
      return;
    }

    if (source.type === "Table") {
      const oldIndex = tasks!.findIndex((t) => t.id === source.id);
      const newIndex = tasks!.findIndex((t) => t.id === overInfo.id);
      const newOrder = arrayMove(tasks!, oldIndex, newIndex);

      await orderTables({
        orgId: org.org.id,
        projectId: project.projectData.id,
        tables: newOrder.map((t, i) => ({ id: t.id, order: i + 1 })),
      });
    } else if (source.type?.startsWith("task-")) {
      // if task is moved to another table
      if (overInfo.tableId && source.data.tableId !== overInfo.tableId) {
        const sourceTable = tasks!.find((t) => t.id === source.data.tableId)!;
        const targetTable = tasks!.find((t) => t.id === overInfo.tableId)!;

        const card = sourceTable.cards!.find((c) => c.id === source.id)!;
        const newSourceCards = sourceTable.cards!.filter(
          (c) => c.id !== source.id,
        );
        const targetIndex = overInfo.id === ""
          ? targetTable.cards!.length
          : targetTable.cards!.findIndex((c) => c.id === overInfo.id);
        const newTargetCards = [
          ...targetTable.cards!.slice(0, targetIndex),
          card,
          ...targetTable.cards!.slice(targetIndex),
        ];

        orderTasks({
          orgId: org.org.id,
          projectId: project.projectData.id,
          type: "out table",
          targetTableId: overInfo.tableId,
          sourceTasks: newSourceCards.map((t, i) => ({ id: t.id, order: i + 1 })),
          targetTasks: newTargetCards.map((t, i) => ({ id: t.id, order: i + 1 })),
        });
        overInfoRef.current = null;
      }
      // if task is moved inside its current table
      else {
        const sourceTable = tasks?.find((t) => t.id === source.data.tableId);
        const oldIndex =
          sourceTable?.cards?.findIndex((c) => c.id === source.id) ?? -1;
        const newIndex =
          sourceTable?.cards?.findIndex((c) => c.id === overInfo.id) ?? -1;

        const newCards = arrayMove(sourceTable!.cards!, oldIndex, newIndex);

        orderTasks({
          orgId: org.org.id,
          projectId: project.projectData.id,
          type: "in table",
          tasks: newCards.map((t, i) => ({ id: t.id, order: i + 1 })),
        });
        overInfoRef.current = null;
      }
    }
  };

  const { data: tasks } = useGetTasksQuery({
    orgId: org.org.id,
    projectId: project.projectData.id,
  });

  const [addTable] = useAddTaskTableMutation();

  return (
    <div className="flex h-full flex-col">
      <p>Task board</p>
      <header>
        <Button2 name="add table" changeHandler={handleAddTable} />
      </header>
      <DragDropProvider
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <ul className="flex flex-1 flex-row items-start gap-4 overflow-x-auto p-4">
          {tasks &&
            tasks.map((table, index) => (
              <TableItem key={table.id} table={table} index={index} />
            ))}
          <button
            className="relative flex flex-shrink-0 items-center gap-1 px-10 py-2 text-sm text-content-soft"
            onClick={handleOpenNewTableForm}
          >
            <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-forest-500" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-forest-500" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-forest-500" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-forest-500" />
            <span className="text-2xl">+</span> New Table
          </button>
        </ul>
        <DragOverlay>
          {(source) => {
            if (typeof source.type === "string" && source.type.startsWith("task-")) {
              const card = tasks
                ?.flatMap((t) => t.cards ?? [])
                .find((c) => c.id === source.id);
              if (!card) return null;
              return (
                <div className="flex flex-col gap-2 rounded bg-surface-card p-3 opacity-90 shadow-lg">
                  <p className="text-[13px] text-forest-400">{card.title}</p>
                  <p className="whitespace-pre-wrap text-[11px]">{card.description}</p>
                  <p>{card.dueDate && formatDueDate(card.dueDate)}</p>
                </div>
              );
            }
            if (source.type === "Table") {
              const table = tasks?.find((t) => t.id === source.id);
              if (!table) return null;
              return (
                <div className="w-64 rounded bg-black p-3 opacity-90 shadow-lg text-sm font-semibold capitalize text-content-soft">
                  {table.name}
                </div>
              );
            }
            return null;
          }}
        </DragOverlay>
      </DragDropProvider>

      {showNewTableForm && (
        <NewTableForm
          tableName={newTableName}
          setTableName={setNewTableName}
          setShowNewTableForm={setShowNewTableForm}
          handleAddTable={handleAddTable}
        />
      )}
    </div>
  );
}
