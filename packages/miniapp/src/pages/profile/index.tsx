import { Image, Text, View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useAppSettings } from "@/lib/app-settings";
import { getAvatarColor, getAvatarInitial } from "@/lib/avatar";
import {
  ChevronRight,
  KeyRound,
  LogOut,
  Settings,
  User,
  UserPen,
} from "@/lib/icons";
import { getStorageUrl } from "@/lib/object-storage";
import {
  removeToken,
  removeUser,
  removeWechatToken,
  removeWechatUser,
} from "@/lib/storage";
import { tabBarStore } from "@/lib/tab-bar-store";
import { trpc } from "@/lib/trpc";
import { useNavBarTheme } from "@/lib/use-nav-bar-theme";
import { useThemeColors } from "@/lib/use-theme-colors";
import { useUser } from "@/lib/user-context";
import { useWechatUser } from "@/lib/wechat-user-context";

function IconBox({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <View
      className="w-7 h-7 rounded-[7px] flex items-center justify-center mr-3"
      style={{ backgroundColor: color }}
    >
      {children}
    </View>
  );
}

function SettingsRow({
  iconBox,
  label,
  onTap,
  isDestructive,
  isLast,
}: {
  iconBox: React.ReactNode;
  label: string;
  onTap: () => void;
  isDestructive?: boolean;
  isLast?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <View>
      <View
        onClick={onTap}
        className="flex flex-row items-center px-4 h-11"
        style={{ backgroundColor: colors.card }}
      >
        {iconBox}
        <Text
          className="flex-1 text-base"
          style={{ color: isDestructive ? "#ff3b30" : colors.fg }}
        >
          {label}
        </Text>
        {!isDestructive && (
          <ChevronRight size={16} color={colors.fgSecondary} />
        )}
      </View>
      {!isLast && (
        <View
          className="h-[0.5px] ml-14"
          style={{ backgroundColor: colors.divider }}
        />
      )}
    </View>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();
  return (
    <View
      className="rounded-[10px] overflow-hidden mx-4"
      style={{ backgroundColor: colors.card }}
    >
      {children}
    </View>
  );
}

function SectionLabel({ label }: { label: string }) {
  const colors = useThemeColors();
  return (
    <Text
      className="text-xs uppercase px-4 pt-4 pb-1 block"
      style={{ color: colors.fgSecondary }}
    >
      {label}
    </Text>
  );
}

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const { wechatUser, setWechatUser } = useWechatUser();
  const { theme } = useAppSettings();
  const isDark = theme === "dark";
  const colors = useThemeColors();
  useNavBarTheme();

  useDidShow(() => {
    tabBarStore.set("/pages/profile/index");
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      removeToken();
      removeUser();
      setUser(null);
      Taro.reLaunch({ url: "/pages/login/index" });
    },
  });

  const wechatLogoutMutation = trpc.wechat.logout.useMutation({
    onSuccess: () => {
      removeWechatToken();
      removeWechatUser();
      setWechatUser(null);
      Taro.reLaunch({ url: "/pages/login/index" });
    },
  });

  const isLoggedIn = !!user || !!wechatUser;
  // Derive display info from whichever login is active
  const avatarKey = user?.settings?.avatarKey ?? wechatUser?.avatarKey ?? "";
  const displayName = user?.name ?? wechatUser?.name ?? "—";
  const subLine = user?.email ?? wechatUser?.phoneNumber ?? null;
  const avatarColor = getAvatarColor(displayName);
  const avatarInitial = getAvatarInitial(
    user?.name ?? wechatUser?.name,
    user?.email,
  );
  // WeChat-only users have no password and no account settings to edit
  const isEmailUser = !!user;

  const handleLogout = () => {
    Taro.showModal({
      title: "退出",
      content: "确定要退出登录吗？",
      confirmColor: "#ff3b30",
      success: ({ confirm }) => {
        if (confirm) {
          if (user) logoutMutation.mutate();
          else wechatLogoutMutation.mutate();
        }
      },
    });
  };

  return (
    <View
      className={`min-h-screen pt-2 pb-5 ${isDark ? "dark" : ""}`}
      style={{ backgroundColor: colors.surface }}
    >
      {/* ── Header Card ─────────────────────────────────────── */}
      {isLoggedIn ? (
        <View
          className="mx-4 mb-4 rounded-[10px] p-4 flex flex-row items-center"
          style={{ backgroundColor: colors.card }}
          onClick={() =>
            Taro.navigateTo({ url: "/pages/profile/edit-profile/index" })
          }
        >
          {avatarKey ? (
            <Image
              src={getStorageUrl(avatarKey)}
              className="w-[72px] h-[72px] rounded-full mr-4"
              style={{ backgroundColor: colors.input }}
            />
          ) : (
            <View
              className="w-[72px] h-[72px] rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: avatarColor }}
            >
              <Text className="text-2xl font-semibold text-white">
                {avatarInitial}
              </Text>
            </View>
          )}
          <View className="flex-1">
            <Text
              className="text-xl font-semibold block"
              style={{ color: colors.fg }}
            >
              {displayName}
            </Text>
            {subLine && (
              <Text
                className="text-sm mt-0.5 block"
                style={{ color: colors.fgSecondary }}
              >
                {subLine}
              </Text>
            )}
          </View>
          <ChevronRight size={18} color={colors.fgSecondary} />
        </View>
      ) : (
        <View
          className="mx-4 mb-4 rounded-[10px] p-4 flex flex-row items-center"
          style={{ backgroundColor: colors.card }}
          onClick={() =>
            Taro.navigateTo({ url: "/pages/login/index?from=profile" })
          }
        >
          <View
            className="w-[72px] h-[72px] rounded-full mr-4 flex items-center justify-center"
            style={{ backgroundColor: colors.input }}
          >
            <User size={36} color={colors.fgSecondary} />
          </View>
          <View className="flex-1">
            <Text
              className="text-xl font-semibold block"
              style={{ color: colors.fg }}
            >
              未登录
            </Text>
            <Text className="text-sm mt-0.5 block" style={{ color: "#007aff" }}>
              点击立即登录
            </Text>
          </View>
          <ChevronRight size={18} color={colors.fgSecondary} />
        </View>
      )}

      {/* ── Account Section (email users only) ─────────────── */}
      {isEmailUser && (
        <>
          <SectionLabel label="账户" />
          <Section>
            <SettingsRow
              iconBox={
                <IconBox color="#007aff">
                  <UserPen size={16} color="#ffffff" />
                </IconBox>
              }
              label="修改个人信息"
              onTap={() =>
                Taro.navigateTo({ url: "/pages/profile/edit-profile/index" })
              }
            />
            <SettingsRow
              iconBox={
                <IconBox color="#ff9500">
                  <KeyRound size={16} color="#ffffff" />
                </IconBox>
              }
              label="修改密码"
              isLast
              onTap={() =>
                Taro.navigateTo({
                  url: "/pages/profile/change-password/index",
                })
              }
            />
          </Section>
        </>
      )}

      {/* ── General Section ─────────────────────────────────── */}
      <SectionLabel label="通用" />
      <Section>
        <SettingsRow
          iconBox={
            <IconBox color="#8e8e93">
              <Settings size={16} color="#ffffff" />
            </IconBox>
          }
          label="通用设置"
          isLast
          onTap={() =>
            Taro.navigateTo({ url: "/pages/profile/settings/index" })
          }
        />
      </Section>

      {/* ── Logout (logged-in only) ──────────────────────────── */}
      {isLoggedIn && (
        <>
          <View className="h-2" />
          <Section>
            <SettingsRow
              iconBox={
                <IconBox color="#ff3b30">
                  <LogOut size={16} color="#ffffff" />
                </IconBox>
              }
              label="退出登录"
              isLast
              isDestructive
              onTap={handleLogout}
            />
          </Section>
        </>
      )}
    </View>
  );
}
