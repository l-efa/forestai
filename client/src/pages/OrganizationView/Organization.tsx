import {
  useDeleteOrganizationMutation,
  useGetOrganizationQuery,
} from "@/api/organization";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@/utils/format";
import Button2 from "@/components/Button2";

export default function Organization() {
  const { id } = useParams();
  const { data: org, isLoading } = useGetOrganizationQuery(id!);
  const navigate = useNavigate();

  const [deleteOrganization] = useDeleteOrganizationMutation();

  const handleDeleteOrganization = async () => {
    console.log("delete");
    const response = await deleteOrganization(id!);

    if (response.data) {
      console.log(response.data);
      navigate("/organization", { replace: true });
    }
  };
  return (
    <div>
      <h1>{org?.name}</h1>
      <h1>{org?.id}</h1>
      <h1>{org?.ownerId}</h1>
      <h1>{formatDate(org?.createdAt ?? "")}</h1>
      <h1>{org?._count.members}</h1>
      <h1>{org?._count.projects}</h1>
      <Button2
        name="Delete organization"
        changeHandler={handleDeleteOrganization}
      />
    </div>
  );
}
