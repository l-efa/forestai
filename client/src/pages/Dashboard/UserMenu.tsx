import { useLogoutUserMutation } from "@/api/auth";
import { Link } from "react-router-dom";

const userMenuLinks = [
  { name: "User", url: "/user" },
  { name: "Settings", url: "/user/settings" },
];

export default function UserMenu() {
  const [logout] = useLogoutUserMutation();

  const logUserOut = async () => {
    await logout();
    window.location.href = "/";
  };
  return (
    <div className="absolute bottom-full left-2 right-2 z-10 mb-3 flex flex-col rounded-lg border border-surface-border bg-surface-card p-2 shadow-cardDrop">
      {userMenuLinks.map((link) => (
        <Link key={link.name} to={link.url}>
          {link.name}
        </Link>
      ))}
      <button className="text-left" onClick={logUserOut}>
        Logout
      </button>
      <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-surface-border bg-surface-card" />
    </div>
  );
}
