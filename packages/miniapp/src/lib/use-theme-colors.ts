import { useAppSettings } from "./app-settings";

export type ThemeColors = {
  surface: string;
  surfaceAlt: string;
  card: string;
  input: string;
  fg: string;
  fgSecondary: string;
  divider: string;
  placeholder: string;
};

const LIGHT: ThemeColors = {
  surface: "#f2f2f7",
  surfaceAlt: "#f7f8fa",
  card: "#ffffff",
  input: "#f2f2f7",
  fg: "#000000",
  fgSecondary: "#6d6d73",
  divider: "#e5e5ea",
  placeholder: "#6d6d73",
};

const DARK: ThemeColors = {
  surface: "#000000",
  surfaceAlt: "#1a1a1a",
  card: "#1c1c1e",
  input: "#2c2c2e",
  fg: "#ffffff",
  fgSecondary: "#8e8e93",
  divider: "#38383a",
  placeholder: "#8e8e93",
};

export function useThemeColors(): ThemeColors {
  const { theme } = useAppSettings();
  return theme === "dark" ? DARK : LIGHT;
}
