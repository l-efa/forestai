import {
  useDeleteTaskItemMutation,
  useEditTaskItemMutation,
} from "@/api/project";
import Button2 from "@/components/Button2";
import Confirm from "@/components/Confirm";
import InputField from "@/components/InputField";
import { useOrgContext } from "@/context/OrgContext";
import { useProjectContext } from "@/context/ProjectContext";
import { Trash2 } from "lucide-react";
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
  const [deleteTask] = useDeleteTaskItemMutation();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleEditTask = async () => {
    await editTask({
      orgId: org.org.id,
      projectId: project.projectData.id,
      taskName: taskName,
      taskDescription: taskDescription,
      taskId: taskId,
    });
    toggleForm();
  };

  const toggleConfirm = () => {
    setShowConfirm((prev) => !prev);
  };

  const removeTask = async () => {
    await deleteTask({
      orgId: org.org.id,
      projectId: project.projectData.id,
      taskId: taskId,
    });
    toggleConfirm();
    toggleForm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        e.stopPropagation();
        toggleForm();
      }}
      onPointerDown={(e) => e.nativeEvent.stopImmediatePropagation()}
    >
      <div
        className="w-80 bg-surface-card p-2 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p>edit task</p>
          <button
            className="text-content-faint hover:text-red-400"
            onClick={toggleConfirm}
          >
            <Trash2 size={16} />
          </button>
        </div>
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
          className="text-content w-full resize-none rounded border border-surface-divider bg-surface-card p-2 text-sm outline-none"
          rows={3}
        />
        <Button2 name="Update" changeHandler={handleEditTask} />
      </div>

      {showConfirm && (
        <Confirm
          info="Are you sure you want to delete this task?"
          confirmButton="Delete"
          cancelButton="Cancel"
          onConfirm={removeTask}
          onCancel={toggleConfirm}
        />
      )}
    </div>
  );
};
