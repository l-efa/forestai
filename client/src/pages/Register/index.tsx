import Button2 from "@/components/Button2";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import Switch from "@/components/Switch";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "@/api/auth";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "@/utils/inputValidation";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [register, { isLoading, isSuccess }] = useRegisterUserMutation();
  const [credentialError, setCredentialError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleAccepted = () => {
    setAccepted((prev) => !prev);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => navigate("/"), 1500);
    }
  }, [isSuccess, navigate]);

  const registerUser = async () => {
    const emailErr = isValidEmail(email);
    if (emailErr) {
      setCredentialError(emailErr);
      return;
    }

    const usernameErr = isValidUsername(username);
    if (usernameErr) {
      setCredentialError(usernameErr);
      return;
    }

    const passwordErr = isValidPassword(password, password2);
    if (passwordErr) {
      setCredentialError(passwordErr);
      return;
    }

    setCredentialError(null);

    const response = await register({ email, username, password });

    if (response.data) {
      setSuccessMessage(response.data.message);
    }

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
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-[90%] min-w-[300px] max-w-[400px] gap-6 py-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="p-6 text-2xl font-bold tracking-widest text-forest-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
            ForestAI
          </h1>
        </div>
        <div className="flex flex-col items-center gap-4">
          <InputField
            name="Email"
            value={email}
            handleChange={setEmail}
            type="text"
            className="w-[75%]"
          />
          <InputField
            name="Username"
            value={username}
            handleChange={setUsername}
            type="text"
            className="w-[75%]"
          />
          <InputField
            name="Password"
            value={password}
            handleChange={setPassword}
            type="password"
            className="w-[75%]"
          />
          <InputField
            name="Repeat Password"
            value={password2}
            handleChange={setPassword2}
            type="password"
            className="w-[75%]"
          />
          <div className="flex w-[75%] items-center">
            <Switch
              checked={accepted}
              onChange={toggleAccepted}
              label="I agree to the terms"
              labelLocation="right"
              style="tick"
            />
          </div>
          <Button2
            name={isLoading ? "Registering..." : "Register"}
            changeHandler={registerUser}
            disabled={!accepted || isLoading}
            className="w-[75%]"
          />
          {credentialError && !isLoading && (
            <p className="text-xs text-red-400">{credentialError}</p>
          )}
          {isSuccess && successMessage && (
            <p className="text-xs text-forest-400">{successMessage}</p>
          )}
          <p className="text-xs text-content-muted">
            Already have an account?{" "}
            <Link to="/" className="text-forest-400 hover:text-forest-300">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
