import Switch from "@/components/Switch";
import { useState } from "react";

export default function Settings() {
  const [allowInvites, setAllowInvites] = useState(false);

  const handleAllowInvites = () => {
    setAllowInvites((prev) => !prev);
  };

  console.log(allowInvites);
  return (
    <div>
      <p>Settings</p>
      <div>
        <Switch
          checked={allowInvites}
          label="Allow organization invites from anyone"
          labelLocation="right"
          style="switch"
          onChange={handleAllowInvites}
        />
      </div>
    </div>
  );
}
