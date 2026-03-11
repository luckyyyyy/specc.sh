import Taro from "@tarojs/taro";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import i18n from "./i18n";
import type { LangMode, ThemeMode } from "./storage";
import {
  getLangMode,
  getThemeMode,
  saveLangMode,
  saveThemeMode,
} from "./storage";

export type Theme = "light" | "dark";

const detectSystemTheme = (): Theme => {
  try {
    // getAppBaseInfo() is the recommended replacement for the deprecated
    // getSystemInfoSync() — it doesn't route through the component instance
    const info = Taro.getAppBaseInfo();
    return info.theme === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

const detectLang = (mode: LangMode): "zh" | "en" => {
  if (mode === "zh" || mode === "en") return mode;
  try {
    const info = Taro.getAppBaseInfo();
    const lang = info.language ?? "zh";
    return lang.toLowerCase().startsWith("zh") ? "zh" : "en";
  } catch {
    return "zh";
  }
};

type AppSettingsContextValue = {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  langMode: LangMode;
  setLangMode: (mode: LangMode) => void;
};

const AppSettingsContext = createContext<AppSettingsContextValue>({
  theme: "light",
  themeMode: "auto",
  setThemeMode: () => {},
  langMode: "auto",
  setLangMode: () => {},
});

export const AppSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeMode, setThemeModeSt] = useState<ThemeMode>(() => getThemeMode());
  const [theme, setTheme] = useState<Theme>(() =>
    themeMode === "auto" ? detectSystemTheme() : themeMode,
  );
  const [langMode, setLangModeSt] = useState<LangMode>(() => getLangMode());

  const setThemeMode = useCallback((mode: ThemeMode) => {
    saveThemeMode(mode);
    setThemeModeSt(mode);
    const resolved = mode === "auto" ? detectSystemTheme() : mode;
    setTheme(resolved);
  }, []);

  const setLangMode = useCallback((mode: LangMode) => {
    saveLangMode(mode);
    setLangModeSt(mode);
    const lang = detectLang(mode);
    void i18n.changeLanguage(lang);
  }, []);

  // Sync i18n language on mount based on persisted langMode
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional mount-only effect
  useEffect(() => {
    const resolved = themeMode === "auto" ? detectSystemTheme() : themeMode;
    setTheme(resolved);
    const lang = detectLang(langMode);
    void i18n.changeLanguage(lang);
  }, []);

  return (
    <AppSettingsContext.Provider
      value={{ theme, themeMode, setThemeMode, langMode, setLangMode }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => useContext(AppSettingsContext);
