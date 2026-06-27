import {
  useDeleteTaskTableMutation,
  useEditTaskTableMutation,
} from "@/api/project";
import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import Confirm from "@/components/Confirm";
import InputField from "@/components/InputField";
import { useOrgContext } from "@/context/OrgContext";
import { useProjectContext } from "@/context/ProjectContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface FormProps {
  tableName: string;
  tableId: string;
  setTableName: (value: string) => void;
  setShowEditTableForm: (value: boolean) => void;
}

export default function EditTableForm({
  setShowEditTableForm,
  tableName,
  tableId,
  setTableName,
}: FormProps) {
  const project = useProjectContext();
  const org = useOrgContext();

  const [editTable] = useEditTaskTableMutation();
  const [deleteTable] = useDeleteTaskTableMutation();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleEditTable = async () => {
    await editTable({
      orgId: org.org.id,
      projectId: project.projectData.id,
      name: tableName,
      tableId: tableId,
    });
    setShowEditTableForm(false);
  };

  const ToggleDeleteConfirm = () => {
    setShowConfirm((prev) => !prev);
  };

  const handleDeleteTable = async () => {
    await deleteTable({
      orgId: org.org.id,
      projectId: project.projectData.id,
      tableId: tableId,
    });
    ToggleDeleteConfirm();
    setShowEditTableForm(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={() => setShowEditTableForm(false)}
    >
      <div
        className="flex w-80 flex-col gap-4 rounded-card bg-surface-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p>edit table</p>
          <button
            className="text-content-faint hover:text-red-400"
            onClick={ToggleDeleteConfirm}
          >
            <Trash2 size={16} />
          </button>
        </div>

        <InputField
          name=""
          value={tableName}
          type="text"
          handleChange={setTableName}
        />

        <div className="flex flex-row items-center justify-center">
          <Button
            name="Cancel"
            changeHandler={() => setShowEditTableForm(false)}
          />
          <Button2 name="Edit" changeHandler={handleEditTable} />
        </div>
      </div>

      {showConfirm && (
        <Confirm
          info="Are you sure you want to delete this table?"
          confirmButton="Delete"
          cancelButton="Cancel"
          onConfirm={handleDeleteTable}
          onCancel={ToggleDeleteConfirm}
        />
      )}
    </div>
  );
}
