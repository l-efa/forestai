import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import SidebarItem from "./SidebarItem";
import UserMenu from "./UserMenu";

import {
  LayoutDashboard,
  Component,
  Building2,
  CalendarDays,
  Info,
  Users,
  FolderKanban,
} from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { avatarColors } from "@/utils/avatarColors";

const siderbarlinks = [
  { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { name: "Organizations", url: "/organization", icon: Building2 },
  { name: "Calendar", url: "/calendar", icon: CalendarDays },
  { name: "Component test", url: "/components", icon: Component },
];

const getOrganizationLinks = (orgId: string) => [
  { name: "Overview", url: `/organization/${orgId}`, icon: Info },
  {
    name: "Projects",
    url: `/organization/${orgId}/projects`,
    icon: FolderKanban,
  },
  { name: "Members", url: `/organization/${orgId}/members`, icon: Users },
];

export default function Dashboard() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const { pathname } = useLocation();
  const orgMatch = pathname.match(/^\/organization\/([^/]+)/);
  const orgId = orgMatch ? orgMatch[1] : null;

  const handleUserMenuClick = () => {
    setOpenUserMenu((prev) => !prev);
  };

  const { user } = useUserContext();
  return (
    <div className="flex h-screen">
      <aside className="hidden w-72 flex-col gap-2 border-r border-surface-border lg:flex">
        <p className="text-lg">ForestAI</p>
        <div className="bg-s flex flex-col gap-2 border-t border-surface-border px-2 pt-2">
          {siderbarlinks.map((item) => (
            <SidebarItem
              key={item.url}
              name={item.name}
              url={item.url}
              icon={item.icon}
            />
          ))}
          {orgId && (
            <>
              <div className="mt-2 border-t border-surface-border pt-2">
                organization
              </div>
              {getOrganizationLinks(orgId).map((item) => (
                <SidebarItem
                  key={item.url}
                  name={item.name}
                  url={item.url}
                  icon={item.icon}
                />
              ))}
            </>
          )}
        </div>
        <div className="relative mt-auto">
          {openUserMenu && <UserMenu />}
          <button
            className="flex w-full items-center gap-3 border-t border-surface-border p-2 text-left"
            onClick={handleUserMenuClick}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-content-primary ${avatarColors[user?.profileColor ?? "green"]}`}
            >
              {user?.username?.[0]?.toUpperCase() ?? "?"}
            </div>
            <span className="text-sm">{user?.username ?? "?"}</span>
          </button>
        </div>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
