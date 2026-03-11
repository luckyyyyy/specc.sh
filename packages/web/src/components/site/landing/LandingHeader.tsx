import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { UserMenu } from "@/components/account";
import { useAuth, useLang, useTheme } from "@/hooks";
import { trpc } from "@/lib/trpc";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function LandingHeader() {
  const { t } = useTranslation();
  const { theme, themeMode, setThemeMode } = useTheme();
  const { user, isAuthed, updateUser, logout } = useAuth();
  const { lang, setLangMode } = useLang();

  const updateProfile = trpc.user.updateProfile.useMutation({
    onSuccess: updateUser,
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    const newMode =
      themeMode === "dark" || (themeMode === "auto" && theme === "dark")
        ? "light"
        : "dark";
    setThemeMode(newMode);
    if (isAuthed) {
      updateProfile.mutate({ settings: { themeMode: newMode } });
    }
  };

  const toggleLang = () => {
    const newMode = lang === "zh" ? "en" : "zh";
    setLangMode(newMode);
    if (isAuthed) {
      updateProfile.mutate({ settings: { langMode: newMode } });
    }
  };

  const isDark = theme === "dark";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/75 dark:bg-zinc-900/75 border-b border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xl font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-black shadow-sm">
              A
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {t("landing.header.brandName")}
            </span>
          </motion.button>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {(
              [
                "features",
                "howItWorks",
                "multiPlatform",
                "techStack",
                "quickStart",
              ] as const
            ).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => scrollTo(key)}
                className="px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors"
              >
                {t(`landing.nav.${key}`)}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors"
              title={t("common.language")}
            >
              <GlobeIcon />
              <span>{lang === "zh" ? "EN" : "中"}</span>
            </button>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors"
              title={t("common.theme")}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/luckyyyyy/specc.sh"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors"
            >
              <GitHubIcon />
            </a>

            {/* CTA / User */}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm transition-all"
                >
                  {t("landing.nav.dashboard")}
                </Link>
                <UserMenu
                  user={user}
                  onUpdateUser={updateUser}
                  onLogout={logout}
                  showDashboardLink
                  glassy
                />
              </>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm transition-all"
              >
                {t("landing.nav.getStarted")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
