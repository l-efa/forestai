import { useEditTaskItemMutation } from "@/api/project";
import Button2 from "@/components/Button2";
import InputField from "@/components/InputField";
import { useOrgContext } from "@/context/OrgContext";
import { useProjectContext } from "@/context/ProjectContext";
import { useState } from "react";

interface EditTaskFormProps {
  toggleForm: () => void;
  taskName: string;
  taskDescription: string;
  taskId: string;
  editTaskName: (value: string) => void;
  editTaskDescription: (value: string) => void;
}

export const EditTaskForm = function ({
  toggleForm,
  taskName,
  taskDescription,
  taskId,
  editTaskName,
  editTaskDescription,
}: EditTaskFormProps) {
  const project = useProjectContext();
  const org = useOrgContext();

  const [editTask] = useEditTaskItemMutation();

  const handleEditTask = async () => {
    editTask({
      orgId: org.org.id,
      projectId: project.projectData.id,
      taskName: taskName,
      taskDescription: taskDescription,
      taskId: taskId,
    });
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
        <p className="text-white">Edit Task</p>
        <InputField
          name=""
          value={taskName}
          type="text"
          handleChange={editTaskName}
        />
        <textarea
          placeholder="description..."
          value={taskDescription}
          onChange={(e) => editTaskDescription(e.target.value)}
          className="text-content w-full resize-none rounded border border-surface-divider bg-surface-card p-2 text-sm text-white outline-none"
          rows={3}
        />
        <Button2 name="Update" changeHandler={handleEditTask} />
      </div>
    </div>
  );
};
