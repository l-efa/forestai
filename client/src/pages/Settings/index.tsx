import {
  useChangeUserSettingsMutation,
  useGetUserSettingsQuery,
} from "@/api/user";
import Button2 from "@/components/Button2";
import Switch from "@/components/Switch";
import { useEffect, useState } from "react";

export default function Settings() {
  const { data: userSettings } = useGetUserSettingsQuery();
  const [updateUserSettings] = useChangeUserSettingsMutation();

  const [allowInvites, setAllowInvites] = useState<boolean>(true);
  const [showEmail, setShowEmail] = useState<boolean>(true);

  const handleSwitch = (switchName: string) => {
    if (switchName === "AllowInvites") setAllowInvites((prev) => !prev);
    if (switchName === "ShowEmail") setShowEmail((prev) => !prev);
  };

  useEffect(() => {
    if (userSettings?.invites !== undefined) {
      setAllowInvites(userSettings.invites);
    }
  }, [userSettings]);

  const handleUserSettingsUpdate = async () => {
    await updateUserSettings({ invites: allowInvites });
    console.log("settings updated");
  };

  return (
    <div>
      <p>Settings</p>
      <div>
        <Switch
          checked={allowInvites ?? true}
          label="Allow organization invites"
          labelLocation="right"
          style="switch"
          onChange={() => handleSwitch("AllowInvites")}
        />
        <Switch
          checked={showEmail ?? true}
          label="Show email to other org members"
          labelLocation="right"
          style="switch"
          onChange={() => handleSwitch("ShowEmail")}
        />
      </div>
      <Button2 name="Update" changeHandler={handleUserSettingsUpdate} />
    </div>
  );
}
