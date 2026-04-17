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
        className={`rounded-lg border border-transparent p-2 text-sm ${isActive ? "bg-surface-active text-forest-400" : "text-content-secondary hover:bg-surface-card"}`}
      >
        {name}
      </Link>
    </>
  );
}
