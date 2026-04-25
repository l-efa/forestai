import {
  useDeleteOrganizationMutation,
  useGetOrganizationQuery,
} from "@/api/organization";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@/utils/format";
import Button2 from "@/components/Button2";
import { useState } from "react";
import Confirm from "@/components/Confirm";

export default function Organization() {
  const { orgId } = useParams();
  const { data: org, isLoading } = useGetOrganizationQuery(orgId!);
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const handleDeleteOrganization = async () => {
    console.log("delete");
    const response = await deleteOrganization(orgId!);

    if (response.data) {
      console.log(response.data);
      navigate("/organization", { replace: true });
    }
  };

  const toggleConfirm = () => setConfirm((prev) => !prev);

  return (
    <div>
      {isLoading && <p>loading</p>}

      <h1>{org?.name}</h1>
      <h1>{org?.id}</h1>
      <h1>{org?.ownerId}</h1>
      <h1>{formatDate(org?.createdAt ?? "")}</h1>
      <h1>{org?._count.members}</h1>
      <h1>{org?._count.projects}</h1>
      <Button2 name="Delete organization" changeHandler={toggleConfirm} />

      {confirm && (
        <Confirm
          info={`Are you sure you want to delete "${org?.name}"`}
          confirmButton="Yes"
          cancelButton="No"
          onConfirm={handleDeleteOrganization}
          onCancel={toggleConfirm}
        />
      )}
    </div>
  );
}
