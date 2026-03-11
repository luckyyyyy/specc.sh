import type { User } from "@specc/types";
import { createContext, useContext, useState } from "react";

type UserContextValue = {
  /** undefined = still loading, null = no user, User = authenticated */
  user: User | null | undefined;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
