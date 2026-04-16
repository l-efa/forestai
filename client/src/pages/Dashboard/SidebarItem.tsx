import { Link, useLocation } from "react-router-dom";

interface sidebarType {
  name: string;
  url: string;
}

export default function SidebarItem({ name, url }: sidebarType) {
  const { pathname } = useLocation();
  const isActive = pathname === url;

  return (
    <>
      <Link
        to={url}
        className={`rounded-lg border border-transparent p-1 text-sm hover:bg-surface-card ${isActive ? "bg-surface-card text-content-primary" : "text-content-secondary"}`}
      >
        {name}
      </Link>
    </>
  );
}
