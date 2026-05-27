import { useGetOrganizationMembersQuery } from "@/api/organization";
import {
  useAddUserMutation,
  useGetProjectMembersQuery,
  useRemoveProjectMemberMutation,
} from "@/api/project";
import Button2 from "@/components/Button2";
import Confirm from "@/components/Confirm";
import { useProjectContext } from "@/context/ProjectContext";
import { avatarColors, borderColors } from "@/utils/avatarColors";
import { formatDate } from "@/utils/format";

import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Teams() {
  const { orgId, projectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const { projectData, projectUser } = useProjectContext();

  const { data: projectMembers } = useGetProjectMembersQuery({
    orgId: orgId!,
    projectId: projectId!,
  });

  const { data: orgMembers } = useGetOrganizationMembersQuery(orgId!);

  const [addUser] = useAddUserMutation();

  const [removeMember] = useRemoveProjectMemberMutation();

  const [showConfirm, setShowConfirm] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleMemberClick = (userId: string) => {
    console.log(userId);
    setSelectedUser(userId);
  };

  const handleMemberSelect = async () => {
    console.log("Selected", selectedUser);
    await addUser({
      orgId: orgId!,
      projectId: projectId!,
      selectedUser: selectedUser,
    });
    toggleModal();
  };

  const handleRemoveClick = (userdId: string) => {
    setSelectedUser(userdId);
    setShowConfirm((prev) => !prev);
  };

  const handleMemberRemove = async (userId: string) => {
    console.log("remove", userId);
    await removeMember({
      orgId: orgId!,
      projectId: projectId!,
      removedUser: userId,
    });
    toggleConfirm();
  };

  const toggleConfirm = () => {
    setShowConfirm((prev) => !prev);
  };

  return (
    <div>
      {projectUser.role !== "member" && (
        <Button2 name="Add members" changeHandler={toggleModal} />
      )}
      <p>Teams</p>
      <div className="flex flex-col gap-2 p-3">
        {projectMembers &&
          projectMembers.map((member) => (
            <div
              key={member.userId}
              className={`flex max-w-md items-center gap-4 rounded-lg border bg-transparent p-3 ${borderColors[member.user.profileColor]}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${avatarColors[member.user.profileColor]}`}
              >
                {member.user.username[0]?.toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{member.user.username}</p>
                <p className="text-xs text-content-secondary">
                  {member.user.email}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase text-content-secondary">
                  {member.role}
                </p>
                <p className="text-xs text-content-secondary">
                  {formatDate(member.createdAt)}
                </p>
                {projectUser.role !== "member" && (
                  <button
                    onClick={() => handleRemoveClick(member.user.username)}
                    className="mt-1 text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
                {showConfirm && (
                  <Confirm
                    info={`Are you sure you want to remove "${selectedUser}" from the group?`}
                    confirmButton="Yes"
                    cancelButton="No"
                    onConfirm={() => handleMemberRemove(member.userId)}
                    onCancel={toggleConfirm}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={toggleModal}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
            <div className="pointer-events-auto w-full max-w-md rounded-xl border border-surface-border bg-surface-card p-6 shadow-cardDrop">
              <h2 className="mb-4 text-lg font-bold">Add Members</h2>
              {orgMembers &&
                orgMembers.map((member) => (
                  <button
                    key={member.userId}
                    onClick={() => handleMemberClick(member.userId)}
                    className={`flex items-center gap-3 rounded-lg p-2 text-left transition-all ${selectedUser === member.userId ? "bg-surface-active" : "hover:bg-surface-card"}`}
                  >
                    <span className="text-sm">
                      {member.user.username} {`(${member.role})`}
                    </span>
                  </button>
                ))}
              <div className="mt-4 flex justify-end gap-2">
                <Button2 name="Select" changeHandler={handleMemberSelect} />
                <button
                  className="rounded-lg px-4 py-2 text-sm text-content-secondary hover:text-content-primary"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
