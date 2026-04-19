import { useLogoutUserMutation } from "@/api/auth";
import { Link } from "react-router-dom";

const userMenuLinks = [
  { name: "User", url: "/user" },
  { name: "Settings", url: "/settings" },
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
        <Link className="text-sm" key={link.name} to={link.url}>
          {link.name}
        </Link>
      ))}
      <button className="text-left text-sm" onClick={logUserOut}>
        Logout
      </button>
    </div>
  );
}
