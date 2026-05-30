import { useLogoutUserMutation } from "@/api/auth";
import Confirm from "@/components/Confirm";
import { socket } from "@/socket";
import { useState } from "react";
import User from "@/pages/User/User";
import Notifications from "@/pages/User/Notifications";
import Settings from "@/pages/Settings";

const userMenuLinks = [
  { name: "Profile", tab: "profile" },
  { name: "Settings", tab: "settings" },
  { name: "Notifications", tab: "notifications" },
] as const;

export default function UserMenu({
  notificationCount,
}: {
  notificationCount: number;
}) {
  const [logout] = useLogoutUserMutation();
  const [confirm, setConfirm] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "settings" | "profile" | "notifications" | null
  >(null);

  const logUserOut = async () => {
    await logout();
    socket.disconnect();
    window.location.href = "/";
  };

  const toggleConfirm = () => {
    setConfirm((prev) => !prev);
  };

  const toggleUserMenu = (value: string) => {
    setUserMenu(true);
    setActiveTab(value as "settings" | "profile" | "notifications");
  };

  return (
    <>
      <div className="absolute bottom-full left-2 right-2 z-10 mb-3 flex flex-col rounded-lg border border-surface-border bg-surface-card p-2 shadow-cardDrop">
        {userMenuLinks.map((link) => (
          <button
            className="flex items-center rounded px-2 py-1.5 text-sm hover:bg-surface-active"
            key={link.name}
            onClick={() => toggleUserMenu(link.tab)}
          >
            {link.name}
            {link.tab === "notifications" && notificationCount > 0 && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-forest-500 text-xs font-bold text-black">
                {notificationCount}
              </span>
            )}
          </button>
        ))}
        <button className="rounded px-2 py-1.5 text-left text-sm hover:bg-surface-active" onClick={toggleConfirm}>
          Logout
        </button>

        {confirm && (
          <Confirm
            info="Are you sure you want to logout?"
            confirmButton="Logout"
            cancelButton="Cancel"
            onConfirm={logUserOut}
            onCancel={toggleConfirm}
          />
        )}
      </div>

      {userMenu && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/50"
          onClick={() => setUserMenu(false)}
        >
          <div
            className="w-[480px] rounded-xl border border-surface-border bg-surface-card p-6 shadow-cardDrop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex gap-4 border-b border-surface-border">
              {userMenuLinks.map((link) => (
                <button
                  key={link.name}
                  className={`pb-2 text-sm ${activeTab === link.tab ? "border-b-2 border-forest-500 text-content-primary" : "text-content-muted"}`}
                  onClick={() => setActiveTab(link.tab)}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="text-sm">
              {activeTab === "profile" && <User />}
              {activeTab === "notifications" && <Notifications />}
              {activeTab === "settings" && <Settings />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
