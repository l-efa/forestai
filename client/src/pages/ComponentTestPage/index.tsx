import ProgressBar from "../../components/ProgressBar";
import Switch from "../../components/Switch";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import Card from "@/components/Card";
import { useDarkModeContext } from "../../context/DarkMode";
import { useState } from "react";

export default function ComponentTestPage() {
  const { darkMode, toggleDarkMode } = useDarkModeContext();
  const [username, setUsername] = useState("");

  const changeHandler = () => {
    console.log("confirmed");
  };

  return (
    <div className="p-10">
      <ProgressBar startNumber={6} endNumber={10} label="test" />
      <div className="flex gap-4">
        <Switch
          checked={darkMode}
          label="test"
          disabled={true}
          onChange={toggleDarkMode}
        />
        <Switch checked={true} label="test2" />
      </div>
      <InputField
        name="test..."
        value={username}
        type="text"
        handleChange={setUsername}
      />
      <Button name="confirm" changeHandler={changeHandler} />
      <Button2 name="yes" changeHandler={changeHandler} />
      <Card> </Card>
    </div>
  );
}
