import { useGetMeQuery } from "@/api/auth";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to={"/"} replace />;
  return children;
};
