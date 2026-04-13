import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import Switch from "@/components/Switch";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const toggleRemember = () => {
    setRemember((prev) => !prev);
  };

  const Log = () => {
    console.log("Logged in!");
  };

  console.log(remember);

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-[90%] min-w-[300px] max-w-[400px] gap-6 py-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="p-6 text-2xl font-bold tracking-widest text-forest-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
            ForestAI
          </h1>
        </div>
        <div className="flex flex-col items-center gap-4">
          <InputField
            name="Username"
            value={username}
            type="text"
            handleChange={setUsername}
            className="w-[75%]"
          />
          <InputField
            name="Password"
            value={password}
            type="password"
            handleChange={setPassword}
            className="w-[75%]"
          />
          <div className="flex w-[75%] items-center justify-between">
            <Switch
              checked={remember}
              onChange={toggleRemember}
              disabled={false}
              label="Remember me"
              labelLocation="right"
              style="tick"
            />
            <a
              href="#"
              className="text-xs text-content-muted hover:text-content-secondary"
            >
              Forgot password?
            </a>
          </div>
          <Button2 name="Log in" changeHandler={Log} className="w-[75%]" />
          <div className="flex w-[75%] items-center gap-3">
            <hr className="flex-1 border-content-faint" />
            <span className="text-xs text-content-faint">OR</span>
            <hr className="flex-1 border-content-faint" />
          </div>
          <Button
            name="Login with Google"
            changeHandler={Log}
            className="w-[75%]"
          />
          <p className="text-xs text-content-muted">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-forest-400 hover:text-forest-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
