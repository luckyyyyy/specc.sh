import type { User } from "@specc/types";
import type { ReactElement, ReactNode } from "react";
import { createContext, useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/lib/trpc";

type AuthState = {
  user: User | null;
  isAuthed: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  updateUser: (user: User) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  isAuthed: false,
  isLoading: true,
  login: () => {},
  updateUser: () => {},
  logout: async () => {},
});

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const logoutMutation = trpc.auth.logout.useMutation();

  const profileQuery = trpc.user.getProfile.useQuery(undefined, {
    retry: false,
  });

  // Derive user directly from query data — no useState/useEffect sync gap.
  const user = profileQuery.data ?? null;
  const isLoading = profileQuery.isPending;

  const login = useCallback(
    (nextUser: User) => {
      utils.user.getProfile.setData(undefined, nextUser);
    },
    [utils],
  );

  const updateUser = login;

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      utils.user.getProfile.reset();
      navigate("/");
    }
  }, [logoutMutation, utils, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthed: Boolean(user),
        isLoading,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
