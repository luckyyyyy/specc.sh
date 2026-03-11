import Taro, { useDidShow } from "@tarojs/taro";
import { useEffect } from "react";
import type { Theme } from "./app-settings";
import { useAppSettings } from "./app-settings";

function applyNavBarColor(theme: Theme) {
  const isDark = theme === "dark";
  const bg = isDark ? "#000000" : "#ffffff";
  const surface = isDark ? "#000000" : "#f2f2f7";
  Taro.setNavigationBarColor({
    frontColor: isDark ? "#ffffff" : "#000000",
    backgroundColor: bg,
    animation: { duration: 0, timingFunc: "easeIn" },
  });
  try {
    Taro.setBackgroundColor({
      backgroundColor: surface,
      backgroundColorTop: surface,
      backgroundColorBottom: surface,
    });
  } catch {
    // setBackgroundColor is not available on all platforms — ignore
  }
}

/**
 * Call in every page component to keep the native navigation bar and page
 * background in sync with the current light/dark theme.
 *
 * useEffect fires on mount (first render) and useDidShow fires each time the
 * page becomes visible again (e.g. returning from a sub-page), so together
 * they eliminate the flash of the default white nav bar in dark mode.
 */
export function useNavBarTheme() {
  const { theme } = useAppSettings();

  // Apply immediately on mount so the nav bar is correct on the first frame
  useEffect(() => {
    applyNavBarColor(theme);
  }, [theme]);

  // Re-apply when returning from a sub-page navigation
  useDidShow(() => {
    applyNavBarColor(theme);
  });
}
