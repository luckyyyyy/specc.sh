import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Compass, Home, Package2, User } from "@/lib/icons";
import { tabBarStore } from "@/lib/tab-bar-store";
import { useThemeColors } from "@/lib/use-theme-colors";

const TAB_LIST = [
  {
    pagePath: "/pages/home/index",
    key: "home",
    Icon: Home,
  },
  {
    pagePath: "/pages/explore/index",
    key: "explore",
    Icon: Compass,
  },
  {
    pagePath: "/pages/workspace/index",
    key: "workspace",
    Icon: Package2,
  },
  {
    pagePath: "/pages/profile/index",
    key: "profile",
    Icon: User,
  },
] as const;

const TAB_LABELS: Record<string, Record<string, string>> = {
  zh: {
    home: "首页",
    explore: "发现",
    workspace: "工作台",
    profile: "我的",
  },
  en: {
    home: "Home",
    explore: "Explore",
    workspace: "Workspace",
    profile: "Profile",
  },
};

function getSafeAreaBottom(): number {
  try {
    // wx.getWindowInfo() is lighter than getSystemInfoSync (non-blocking, window-only)
    const { safeArea, screenHeight } = Taro.getWindowInfo();
    return safeArea ? Math.max(0, screenHeight - safeArea.bottom) : 0;
  } catch {
    return 0;
  }
}

export default function CustomTabBar() {
  const { i18n } = useTranslation();
  const colors = useThemeColors();
  const lang = i18n.language?.startsWith("zh") ? "zh" : "en";
  const labels = TAB_LABELS[lang] ?? TAB_LABELS.zh;
  const safeAreaBottom = getSafeAreaBottom();

  const [selected, setSelected] = useState<string>(tabBarStore.get);

  // Subscribe to page-driven updates (each tab page calls tabBarStore.set in
  // useDidShow, which is more reliable than reading getCurrentPages() here
  // because WeChat may fire the tab bar's onShow before the page stack updates).
  useEffect(() => tabBarStore.subscribe(setSelected), []);

  const switchTab = (path: string) => {
    if (selected === path) return;
    // Update the store (not just local state) so that when WeChat mounts the
    // NEXT tab's fresh tabBar instance it reads the correct path immediately.
    // tabBarStore.set also notifies listeners (including our own setSelected).
    tabBarStore.set(path);
    Taro.switchTab({ url: path });
  };

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderTop: `1px solid ${colors.divider}`,
      }}
    >
      <View className="flex flex-row items-center h-[100px]">
        {TAB_LIST.map(({ pagePath, key, Icon }) => {
          const isActive = selected === pagePath;
          const color = isActive ? "#1677ff" : "#9ca3af";
          return (
            <View
              key={key}
              className="flex-1 flex flex-col items-center justify-center py-1.5 gap-0.5"
              onClick={() => switchTab(pagePath)}
            >
              <Icon size={22} color={color} />
              <Text className="text-[20px] leading-[28px]" style={{ color }}>
                {labels[key] ?? key}
              </Text>
            </View>
          );
        })}
      </View>
      {/* Safe area spacer for devices with home indicator (iPhone X+) */}
      {safeAreaBottom > 0 && <View style={{ height: `${safeAreaBottom}px` }} />}
    </View>
  );
}
