import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface sidebarType {
  name: string;
  url: string;
  icon: LucideIcon;
}

export default function SidebarItem({ name, url, icon: Icon }: sidebarType) {
  const { pathname } = useLocation();
  const isActive = pathname === url;

  return (
    <Link
      to={url}
      className={`flex items-center gap-2 rounded-lg border border-transparent p-2 text-sm ${isActive ? "bg-surface-active text-forest-400" : "text-content-secondary hover:bg-surface-card"}`}
    >
      <Icon size={18} strokeWidth={2} />
      {name}
    </Link>
  );
}
