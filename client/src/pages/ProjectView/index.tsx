import {
  useDeleteProjectMutation,
  useGetProjectDataQuery,
} from "@/api/project";
import Button from "@/components/Button";
import Confirm from "@/components/Confirm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Project() {
  const { orgId, projectId } = useParams();

  const { data: projectData } = useGetProjectDataQuery({
    orgId: orgId!,
    projectId: projectId!,
  });

  const [deleteProject] = useDeleteProjectMutation();

  const [openConfirm, setOpenConfirm] = useState(false);

  const navigate = useNavigate();

  const handleDeleteProject = async () => {
    await deleteProject({ orgId: orgId!, projectId: projectId! });
    navigate(`/organization/${orgId}/project`);
  };

  const toggleModal = () => {
    setOpenConfirm((prev) => !prev);
  };

  return (
    <div>
      <div>
        <p>{projectData?.name}</p>
        <p>{projectData?.createdAt}</p>
        <p>{projectData?.id}</p>
      </div>
      <Button name="Delete project" changeHandler={toggleModal} />
      {openConfirm && (
        <Confirm
          info={`Are you sure you want to delete "${projectData?.name}" project?`}
          confirmButton="Yes"
          cancelButton="No"
          onConfirm={handleDeleteProject}
          onCancel={toggleModal}
        />
      )}
    </div>
  );
}
