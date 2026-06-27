import {
  useAddTaskTableMutation,
  useGetTasksQuery,
  useOrderTaskTableMutation,
} from "@/api/project";
import Button2 from "@/components/Button2";
import { useOrgContext } from "@/context/OrgContext";
import { useProjectContext } from "@/context/ProjectContext";
import { useState } from "react";
import NewTableForm from "./NewTableForm";
import TableItem from "./DraggableTableItem";

import { arrayMove } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

export default function Task() {
  const project = useProjectContext();
  const org = useOrgContext();
  const [orderTables] = useOrderTaskTableMutation();

  const [newTableName, setNewTableName] = useState("");

  const [showNewTableForm, setShowNewTableForm] = useState(false);

  const [overId, setOverId] = useState<string | null>(null);

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

  const handleDragOver = (event: any) => {
    const { source, target } = event.operation;
    if (target && source.id !== target.id) setOverId(target.id);
  };

  const handleDragEnd = async (event: any) => {
    console.log("dragend: ", event);
    const { source } = event.operation;

    if (!overId || source.id === overId) {
      setOverId(null);
      return;
    }
    const oldIndex = tasks!.findIndex((t) => t.id === source.id);
    const newIndex = tasks!.findIndex((t) => t.id === overId);
    const newOrder = arrayMove(tasks!, oldIndex, newIndex);

    await orderTables({
      orgId: org.org.id,
      projectId: project.projectData.id,
      tables: newOrder.map((t, i) => ({ id: t.id, order: i + 1 })),
    });
    setOverId(null);
  };

  const { data: tasks } = useGetTasksQuery({
    orgId: org.org.id,
    projectId: project.projectData.id,
  });
  console.log(tasks);

  const [addTable] = useAddTaskTableMutation();

  return (
    <div className="flex h-full flex-col">
      <p>Task board</p>
      <header>
        <Button2 name="add table" changeHandler={handleAddTable} />
      </header>
      <DragDropProvider onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
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
