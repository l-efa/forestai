import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import Switch from "@/components/Switch";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLoginUserMutation } from "@/api/auth";
import { useUserContext } from "@/context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [credentialError, setCredentialError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginUserMutation();
  const { user, isError } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isError) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isError, navigate]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      loginUser();
    }
  };

  const toggleRemember = () => {
    setRemember((prev) => !prev);
  };

  const loginUser = async () => {
    if (!username || !password) {
      setCredentialError("All fields are required");
      return;
    }
    setCredentialError(null);
    const response = await login({ username, password, remember });

    if (response.error) {
      if ("data" in response.error) {
        setCredentialError(
          (response.error.data as { message: string }).message,
        );
      } else {
        setCredentialError("Network error, please check your connection");
      }
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center px-4"
      onKeyDown={onKeyDown}
    >
      <Card className="w-[90%] min-w-[300px] max-w-[400px] gap-6 rounded-xl py-8 shadow-cardDrop shadow-cardGlow">
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
          {credentialError && !isLoading && (
            <p className="w-[75%] text-xs text-red-400">{credentialError}</p>
          )}
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
          <Button2
            name="Log in"
            changeHandler={loginUser}
            className="w-[75%]"
            disabled={isLoading}
          />
          <div className="flex w-[75%] items-center gap-3">
            <hr className="flex-1 border-content-faint" />
            <span className="text-xs text-content-faint">OR</span>
            <hr className="flex-1 border-content-faint" />
          </div>
          <Button
            name="Login with Google"
            changeHandler={loginUser}
            className="w-[75%]"
            disabled={true}
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
