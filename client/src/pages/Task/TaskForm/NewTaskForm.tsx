import { useAddTaskCardMutation } from "@/api/project";
import Button2 from "@/components/Button2";
import InputField from "@/components/InputField";
import { useOrgContext } from "@/context/OrgContext";
import { useProjectContext } from "@/context/ProjectContext";
import { useState } from "react";

interface FormProps {
  tableId: string;
  toggleForm: () => void;
}

export default function NewTaskForm({ toggleForm, tableId }: FormProps) {
  const { projectData } = useProjectContext();
  const { org } = useOrgContext();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [addTaskCard] = useAddTaskCardMutation();

  const handleCreateTask = async () => {
    console.log(taskName, description, dueDate);
    await addTaskCard({
      orgId: org.id,
      projectId: projectData.id,
      taskName,
      description,
      dueDate,
      tableId,
    });
    toggleForm();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={toggleForm}
      onPointerDown={(e) => e.nativeEvent.stopImmediatePropagation()}
    >
      <div
        className="w-80 bg-surface-card"
        onClick={(e) => e.stopPropagation()}
      >
        <p>New Task</p>
        <div>
          <InputField
            name="Task name..."
            value={taskName}
            type="text"
            handleChange={setTaskName}
          />
          <textarea
            placeholder="description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-content w-full resize-none rounded border border-surface-divider bg-surface-card p-2 text-sm outline-none"
            rows={3}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-content w-full rounded border border-surface-divider bg-surface-card p-2 text-sm outline-none [color-scheme:dark]"
          />
        </div>
        <Button2 name="Create" changeHandler={handleCreateTask} />
      </div>
    </div>
  );
}
