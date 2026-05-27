import { useLogoutUserMutation } from "@/api/auth";
import Confirm from "@/components/Confirm";
import { socket } from "@/socket";
import { useState } from "react";
import { Link } from "react-router-dom";

const userMenuLinks = [
  { name: "User", url: "/user" },
  { name: "Settings", url: "/settings" },
  { name: "Notifications", url: "/notifications" },
];

export default function UserMenu({
  notificationCount,
}: {
  notificationCount: number;
}) {
  const [logout] = useLogoutUserMutation();
  const [confirm, setConfirm] = useState(false);

  const logUserOut = async () => {
    await logout();
    socket.disconnect();
    window.location.href = "/";
  };

  const toggleConfirm = () => {
    setConfirm((prev) => !prev);
  };

  return (
    <div className="absolute bottom-full left-2 right-2 z-10 mb-3 flex flex-col rounded-lg border border-surface-border bg-surface-card p-2 shadow-cardDrop">
      {userMenuLinks.map((link) => (
        <Link
          className="flex items-center text-sm"
          key={link.name}
          to={link.url}
        >
          {link.name}
          {link.name === "Notifications" && notificationCount > 0 && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-forest-500 text-xs font-bold text-black">
              {notificationCount}
            </span>
          )}
        </Link>
      ))}
      <button className="text-left text-sm" onClick={toggleConfirm}>
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
  );
}
