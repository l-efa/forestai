import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useUserContext } from "@/context/UserContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, isError } = useUserContext();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <Navigate to={"/"} replace />;
  return children;
};
