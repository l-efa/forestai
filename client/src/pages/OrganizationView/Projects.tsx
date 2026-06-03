import { useCreateProjectMutation, useGetProjectsQuery } from "@/api/project";
import Button2 from "@/components/Button2";
import InputField from "@/components/InputField";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "@/utils/format";

export default function Projects() {
  const { orgId } = useParams();
  const { data: projects } = useGetProjectsQuery(orgId!);
  const [createProject] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCreateProject = () => {
    createProject({ name: projectName, orgId: orgId! });
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div>
      <Button2 name="Create project" changeHandler={toggleModal} />
      <p>projects</p>
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={toggleModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl border border-surface-border bg-surface-card p-6 shadow-cardDrop">
              <h2 className="mb-4 text-lg font-bold">Create Project</h2>
              <InputField
                name="Project name"
                value={projectName}
                type="text"
                handleChange={setProjectName}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="rounded-lg px-4 py-2 text-sm text-content-secondary hover:text-content-primary"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <Button2 name="Create" changeHandler={handleCreateProject} />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Link
            to={`${project.id}`}
            key={project.id}
            className="flex flex-col gap-2 rounded-lg border border-surface-border bg-surface-card p-4 shadow-cardDrop hover:bg-surface-active"
          >
            <p className="font-medium text-content-primary">{project.name}</p>
            <p className="text-xs text-content-muted">{formatDate(project.createdAt)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
