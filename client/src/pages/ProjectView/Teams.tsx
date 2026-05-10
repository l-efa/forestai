import { useGetOrganizationMembersQuery } from "@/api/organization";
import { useGetProjectMembersQuery } from "@/api/project";
import Button2 from "@/components/Button2";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Teams() {
  const { orgId, projectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projectMembers } = useGetProjectMembersQuery({
    orgId: orgId!,
    projectId: projectId!,
  });

  const { data: orgMembers } = useGetOrganizationMembersQuery(orgId!);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <Button2 name="Add members" changeHandler={toggleModal} />
      <p>Teams</p>
      {projectMembers &&
        projectMembers.map((member) => (
          <div key={member.userId}>
            <p>{member.user.username}</p>
            <p>{member.userId}</p>
          </div>
        ))}
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
                  <div>
                    <p>{member.user.username}</p>
                    <p>{member.role}</p>
                  </div>
                ))}
              <div className="mt-4 flex justify-end gap-2">
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
