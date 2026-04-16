import { Outlet } from "react-router-dom";

import SidebarItem from "./SidebarItem";

const siderbarlinks = [
  { name: "Settings", url: "/dashboard/settings" },
  { name: "Component test", url: "/dashboard/components" },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <aside className="hidden w-72 flex-col gap-2 border-r border-surface-border lg:flex">
        <h1>ForestAI</h1>
        <div className="bg-s flex flex-col gap-2 px-2">
          {siderbarlinks.map((item) => (
            <SidebarItem key={item.url} name={item.name} url={item.url} />
          ))}
        </div>
        <button className="mt-auto bg-surface-knob p-2 text-left">Dew</button>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
