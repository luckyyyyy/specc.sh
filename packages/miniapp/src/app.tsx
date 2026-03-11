// App 入口 — 挂载 tRPC Provider + QueryClientProvider
import "./polyfills"; // must be first — patches missing browser APIs in miniapp runtime
import "./app.css";
import "./lib/i18n"; // initialize i18n before any component renders
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { AppSettingsProvider } from "@/lib/app-settings";
import { isUnauthorized, navigateToLogin } from "@/lib/auth";
import { getToken, getWechatToken } from "@/lib/storage";
import { trpc, trpcClient } from "@/lib/trpc";
import { UserProvider, useUser } from "@/lib/user-context";
import { useWechatUser, WechatUserProvider } from "@/lib/wechat-user-context";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isUnauthorized(error)) navigateToLogin();
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (isUnauthorized(error)) navigateToLogin();
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (isUnauthorized(error)) return false;
        return failureCount < 1;
      },
      staleTime: 30_000,
    },
  },
});

// 在 Provider 内部调用 getProfile，把结果存入全局 context
function AppContent({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUser();
  const { wechatUser, setWechatUser } = useWechatUser();
  const profileQuery = trpc.user.getProfile.useQuery(undefined, {
    retry: false,
    enabled: !!getToken(),
  });
  const wechatProfileQuery = trpc.wechat.getProfile.useQuery(undefined, {
    retry: false,
    enabled: !!getWechatToken(),
  });

  // If a query is disabled (no token), it never resolves — set context to null immediately
  useEffect(() => {
    if (!getToken()) setUser(null);
    if (!getWechatToken()) setWechatUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser, setWechatUser]);

  useEffect(() => {
    if (profileQuery.isSuccess) setUser(profileQuery.data);
    else if (profileQuery.isError) setUser(null);
  }, [
    profileQuery.isSuccess,
    profileQuery.isError,
    profileQuery.data,
    setUser,
  ]);

  useEffect(() => {
    if (wechatProfileQuery.isSuccess)
      setWechatUser(wechatProfileQuery.data.wechatUser);
    else if (wechatProfileQuery.isError) setWechatUser(null);
  }, [
    wechatProfileQuery.isSuccess,
    wechatProfileQuery.isError,
    wechatProfileQuery.data,
    setWechatUser,
  ]);

  // Both checks complete and neither is authenticated → go to login
  useEffect(() => {
    if (user === null && wechatUser === null) {
      navigateToLogin();
    }
  }, [user, wechatUser]);

  // In Taro mini-programs, `children` is the current WeChat page component.
  // It MUST always be rendered — if we replace it with a loading view,
  // Taro's AppWrapper.mount() callback can't find the page element via
  // document.getElementById and throws '没有找到组件实例'.
  // Loading/auth states should be handled per-page, not here.
  return <>{children}</>;
}

function App({ children }: { children: React.ReactNode }) {
  return (
    <AppSettingsProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <WechatUserProvider>
              <AppContent>{children}</AppContent>
            </WechatUserProvider>
          </UserProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </AppSettingsProvider>
  );
}

export default App;
