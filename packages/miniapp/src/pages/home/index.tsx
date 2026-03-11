import { Text, View } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import { useAppSettings } from "@/lib/app-settings";
import { tabBarStore } from "@/lib/tab-bar-store";
import { useNavBarTheme } from "@/lib/use-nav-bar-theme";
import { useThemeColors } from "@/lib/use-theme-colors";

export default function HomePage() {
  const { theme } = useAppSettings();
  const isDark = theme === "dark";
  const colors = useThemeColors();
  useNavBarTheme();

  useDidShow(() => {
    tabBarStore.set("/pages/home/index");
  });

  return (
    <View
      className={`min-h-screen flex flex-col items-center justify-center ${isDark ? "dark" : ""}`}
      style={{ backgroundColor: colors.surface }}
    >
      <Text className="text-2xl font-bold text-fg mb-2">首页</Text>
      <Text className="text-sm text-fg-muted">在这里构建你的首页内容</Text>
    </View>
  );
}
