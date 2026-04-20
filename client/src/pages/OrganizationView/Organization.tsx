import { useGetOrganizationQuery } from "@/api/organization";
import { useParams } from "react-router-dom";
import { formatDate } from "@/utils/format";

export default function Organization() {
  const { id } = useParams();
  const { data: org, isLoading } = useGetOrganizationQuery(id!);
  return (
    <div>
      <h1>{org?.name}</h1>
      <h1>{org?.id}</h1>
      <h1>{org?.ownerId}</h1>
      <h1>{formatDate(org?.createdAt ?? "")}</h1>
    </div>
  );
}
