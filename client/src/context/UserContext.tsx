import { useGetMeQuery } from "@/api/auth";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { User } from "@/types/User";
import { socket } from "@/socket";

type UserContextType = {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading, isError } = useGetMeQuery();

  useEffect(() => {
    if (user) socket.connect();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
