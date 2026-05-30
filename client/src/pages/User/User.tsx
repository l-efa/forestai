import { avatarColors, borderColors } from "@/utils/avatarColors";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useChangeProfileColorMutation } from "@/api/user";
import Button2 from "@/components/Button2";

export default function User() {
  const user = useUserContext();
  const [color, setColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user.user?.profileColor) setColor(user.user.profileColor);
  }, [user.user]);

  const [changeProfileColor] = useChangeProfileColorMutation();

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  const changeColor = async () => {
    await changeProfileColor(color as string);
  };

  return (
    <div>
      <p>Profile</p>
      <div className="flex gap-2">
        {Object.entries(avatarColors).map(([key, value]) => (
          <button
            key={key}
            className={`h-8 w-8 rounded-full ${value} ${key === color ? `ring-2 ring-offset-2 ring-offset-surface-card ${borderColors[key]}` : ""}`}
            onClick={() => handleColorChange(key)}
          />
        ))}
        <Button2 name="Update" changeHandler={changeColor} />
      </div>
    </div>
  );
}
