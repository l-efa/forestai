import { Outlet } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { useState } from "react";
import UserMenu from "./UserMenu";

const siderbarlinks = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Component test", url: "/dashboard/components" },
];

export default function Dashboard() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const handleUserMenuClick = () => {
    setOpenUserMenu((prev) => !prev);
  };
  return (
    <div className="flex h-screen">
      <aside className="hidden w-72 flex-col gap-2 border-r border-surface-border lg:flex">
        <h1>ForestAI</h1>
        <div className="bg-s flex flex-col gap-2 border-t border-surface-border px-2 pt-2">
          {siderbarlinks.map((item) => (
            <SidebarItem key={item.url} name={item.name} url={item.url} />
          ))}
        </div>
        <div className="relative mt-auto">
          {openUserMenu && <UserMenu />}
          <button
            className="w-full border-t border-surface-border p-2 text-left"
            onClick={handleUserMenuClick}
          >
            Dew
          </button>
        </div>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
