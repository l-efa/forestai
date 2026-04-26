import { useGetOwnedOrganizationsQuery } from "@/api/organization";
import { Link } from "react-router-dom";
import { Users, FolderOpen } from "lucide-react";
import Card from "@/components/Card";

export default function OwnedOrganizations() {
  const { data: organizations, isLoading } = useGetOwnedOrganizationsQuery();

  if (isLoading)
    return <div className="text-sm text-content-muted">Loading...</div>;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-content-secondary">Your organizations</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizations?.map((org) => (
          <Link
            to={`/organization/${org.id}`}
            key={org.id}
            className="max-w-60"
          >
            <Card className="border border-surface-border transition-all hover:border-forest-400/30">
              <div className="flex items-start justify-between">
                <div className="rounded-xs flex h-12 w-12 items-center justify-center bg-forest-900/60 text-lg font-bold text-forest-400">
                  {org.name[0]?.toUpperCase()}
                </div>
                <span className="rounded-full bg-forest-900/40 px-3 py-1 text-xs font-medium text-forest-400">
                  Active
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-content-primary">
                {org.name}
              </h3>

              <div className="mt-4 flex items-center justify-between border-t border-surface-divider pt-3 text-xs text-content-secondary">
                <span className="flex items-center gap-1.5">
                  <FolderOpen size={14} />
                  Projects
                </span>
                <span className="rounded-full bg-surface-dark px-2 py-0.5 text-xs text-content-muted">
                  {org._count.projects}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-content-secondary">
                <span className="flex items-center gap-1.5">
                  <Users size={14} />
                  Members
                </span>
                <span className="rounded-full bg-surface-dark px-2 py-0.5 text-xs text-content-muted">
                  {org._count.members}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {organizations?.length === 0 && (
        <p className="text-sm text-content-muted">No organizations yet</p>
      )}
    </div>
  );
}
