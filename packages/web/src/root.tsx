import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { MessageProvider } from "./components/providers/MessageProvider";
import {
  AuthProvider,
  LangProvider,
  ThemeProvider,
  useAuth,
  useLang,
  useTheme,
  useTrpcQueryClient,
} from "./hooks";
import i18n from "./lib/i18n";
import { trpc } from "./lib/trpc";

const getWorkspaceFromPath = () => {
  if (typeof window === "undefined") return undefined;
  const match = window.location.pathname.match(/^\/dashboard\/([^/]+)/);
  return match?.[1];
};

/** Syncs the user's theme/lang preferences to global context after login */
function ThemeLangSync() {
  const { user } = useAuth();
  const { setThemeMode } = useTheme();
  const { setLangMode } = useLang();

  useEffect(() => {
    if (user) {
      // Logged in: prefer user settings; fall back to cookie / browser-detected value if not set
      if (user.settings?.themeMode) setThemeMode(user.settings.themeMode);
      if (user.settings?.langMode) setLangMode(user.settings.langMode);
    } else {
      // Not logged in: force dark theme; keep language from cookie / browser auto-detection
      setThemeMode("dark");
    }
  }, [user, setThemeMode, setLangMode]);

  return null;
}

function Providers({ children }: { children: ReactNode }) {
  const queryClient = useTrpcQueryClient();
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: import.meta.env.VITE_TRPC_URL || "/trpc",
            fetch(url, options) {
              return fetch(url, { ...options, credentials: "include" });
            },
            headers() {
              const workspaceSlug = getWorkspaceFromPath();
              return {
                ...(workspaceSlug ? { "x-workspace-id": workspaceSlug } : {}),
                "x-lang": i18n.resolvedLanguage ?? i18n.language ?? "zh",
              };
            },
          }),
        ],
      }),
    [],
  );
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <LangProvider>
              <MessageProvider>
                <AuthProvider>
                  <ThemeLangSync />
                  {children}
                </AuthProvider>
              </MessageProvider>
            </LangProvider>
          </ThemeProvider>
        </I18nextProvider>
      </trpc.Provider>
    </QueryClientProvider>
  );
}

export default function Root() {
  return (
    <html lang="zh">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Providers>
          <Outlet />
        </Providers>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
