import {
  useEditOrgMemberMutation,
  useRemoveMemberMutation,
} from "@/api/organization";
import Button2 from "@/components/Button2";
import Confirm from "@/components/Confirm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { roles } from "@/utils/roles";

interface editPropsType {
  editingMember: { id: string; name: string; role: string };
  setEditingMember: (
    member: { id: string; name: string; role: string } | null,
  ) => void;
  toggleEditForm: () => void;
}

export default function EditMember({
  editingMember,
  setEditingMember,
  toggleEditForm,
}: editPropsType) {
  const [removeModal, setRemoveModal] = useState(false);
  const { orgId } = useParams();
  const [removeUser] = useRemoveMemberMutation();

  const changeRole = (role: string) => {
    setEditingMember({
      id: editingMember.id,
      name: editingMember.name,
      role: role,
    });
  };

  const toggleRemoveModal = () => {
    setRemoveModal((prev) => !prev);
  };

  const handleRemoveUser = async (userId: string) => {
    await removeUser({ userId: userId, orgId: orgId! });
    toggleRemoveModal();
  };

  const [EditMember] = useEditOrgMemberMutation();

  const handleRoleChange = async () => {
    await EditMember({
      orgId: orgId!,
      orgUser: editingMember.id,
      newRole: editingMember.role.toLowerCase(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => {
        e.stopPropagation();
        toggleEditForm();
      }}
    >
      <div
        className="w-80 rounded-xl border border-surface-border bg-surface-card p-4 text-content-primary shadow-cardDrop"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-base font-semibold">{editingMember.name}</p>
        <hr className="my-3 border-forest-500/30" />

        <div className="flex flex-col gap-2">
          {roles.map(({ role, info }) => (
            <p
              key={role}
              onClick={() => changeRole(role)}
              className={`cursor-pointer rounded-lg border p-2 transition-colors hover:bg-surface-active ${role.toLowerCase() === editingMember.role.toLowerCase() ? "border-forest-500 bg-surface-active" : "border-transparent"}`}
            >
              {role}
              <span className="block text-xs text-content-faint">{info}</span>
            </p>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-surface-divider pt-3">
          <button
            className="text-sm text-red-500 hover:text-red-400"
            onClick={toggleRemoveModal}
          >
            Remove user
          </button>
          <Button2 name="Update" changeHandler={handleRoleChange} />
        </div>

        {removeModal && (
          <Confirm
            info="Are you sure you want to remove this user from organizaton?"
            confirmButton="Yes"
            cancelButton="No"
            onConfirm={() => handleRemoveUser(editingMember.id)}
            onCancel={toggleRemoveModal}
          />
        )}
      </div>
    </div>
  );
}
