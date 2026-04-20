import { useGetOwnedOrganizationsQuery } from "@/api/organization";
import { Link } from "react-router-dom";

export default function OwnedOrganizations() {
  const { data: organizations } = useGetOwnedOrganizationsQuery();

  return (
    <div className="flex flex-col gap-1">
      <p>owned organizations: </p>
      {organizations?.map((org) => (
        <Link to={`/organization/${org.id}`} key={org.id}>
          {org.name}
        </Link>
      ))}
      {organizations?.length === 0 && <p>No organizations</p>}
    </div>
  );
}
