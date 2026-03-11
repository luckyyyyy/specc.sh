import { Button, Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { useAppSettings } from "@/lib/app-settings";
import { navigateAfterLogin } from "@/lib/auth";
import { trpc } from "@/lib/trpc";
import { useNavBarTheme } from "@/lib/use-nav-bar-theme";
import { useThemeColors } from "@/lib/use-theme-colors";
import { useUser } from "@/lib/user-context";
import { useWechatUser } from "@/lib/wechat-user-context";

type LoginView = "main" | "email";

export default function LoginPage() {
  const { user, setUser } = useUser();
  const { wechatUser, setWechatUser } = useWechatUser();
  const { theme } = useAppSettings();
  const isDark = theme === "dark";
  const colors = useThemeColors();
  useNavBarTheme();

  const router = Taro.getCurrentInstance().router;
  const fromProfile = router?.params?.from === "profile";
  const redirect = router?.params?.redirect
    ? decodeURIComponent(router.params.redirect as string)
    : null;

  const [view, setView] = useState<LoginView>("main");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auto-redirect if already authenticated (e.g. app relaunch with active session)
  useEffect(() => {
    if (wechatUser || user) {
      navigateAfterLogin(redirect);
    }
  }, [wechatUser, user, redirect]);

  // -----------------------------------------------------------------------
  // 微信一键登录
  // -----------------------------------------------------------------------
  const wechatLoginMutation = trpc.wechat.login.useMutation({
    onSuccess(data) {
      setWechatUser(data.wechatUser);
      if (fromProfile) {
        Taro.navigateBack();
      } else {
        navigateAfterLogin(redirect);
      }
    },
    onError(err) {
      Taro.showToast({
        title: err.message ?? "微信登录失败",
        icon: "none",
        duration: 3000,
      });
    },
  });

  const handleWechatLogin = () => {
    Taro.login({
      success(res) {
        if (res.code) {
          wechatLoginMutation.mutate({ code: res.code });
        } else {
          Taro.showToast({ title: "获取 code 失败，请重试", icon: "none" });
        }
      },
      fail() {
        Taro.showToast({ title: "微信登录失败，请重试", icon: "none" });
      },
    });
  };

  // -----------------------------------------------------------------------
  // 获取手机号登录
  // -----------------------------------------------------------------------
  const bindPhoneMutation = trpc.wechat.bindPhone.useMutation({
    onSuccess(data) {
      setWechatUser(data.wechatUser);
      if (fromProfile) {
        Taro.navigateBack();
      } else {
        navigateAfterLogin(redirect);
      }
    },
    onError(err) {
      Taro.showToast({
        title: err.message ?? "获取手机号失败",
        icon: "none",
        duration: 3000,
      });
    },
  });

  // getPhoneNumber 按钮回调：先 wx.login 建立 wechat session，再绑定手机号
  const handleGetPhoneNumber = (phoneCode: string) => {
    Taro.login({
      success(res) {
        if (!res.code) {
          Taro.showToast({ title: "获取 code 失败", icon: "none" });
          return;
        }
        wechatLoginMutation.mutate(
          { code: res.code },
          {
            onSuccess: () => {
              bindPhoneMutation.mutate({ code: phoneCode });
            },
          },
        );
      },
      fail() {
        Taro.showToast({ title: "微信登录失败", icon: "none" });
      },
    });
  };

  // -----------------------------------------------------------------------
  // 邮箱密码登录
  // -----------------------------------------------------------------------
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess(data) {
      setUser(data.user);
      if (fromProfile) {
        Taro.navigateBack();
      } else {
        navigateAfterLogin(redirect);
      }
    },
    onError(err) {
      Taro.showToast({
        title: err.message ?? "登录失败，请重试",
        icon: "none",
        duration: 3000,
      });
    },
  });

  const handleEmailLogin = () => {
    const trimEmail = email.trim();
    if (!trimEmail || !password) {
      Taro.showToast({ title: "请填写邮箱和密码", icon: "none" });
      return;
    }
    loginMutation.mutate({ email: trimEmail, password });
  };

  const isWechatPending =
    wechatLoginMutation.isPending || bindPhoneMutation.isPending;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <View
      className={`min-h-screen flex flex-col items-center justify-center px-6 ${isDark ? "dark" : ""}`}
      style={{ backgroundColor: colors.surfaceAlt }}
    >
      {/* Logo */}
      <Text className="text-[2rem] font-bold text-fg mb-2">Specc</Text>
      <Text className="text-sm text-fg-muted mb-10">欢迎使用 Specc 小程序</Text>

      {view === "main" ? (
        <View className="w-full flex flex-col gap-3">
          {/* 主按钮：微信一键登录 */}
          <View
            className="w-full h-12 rounded-3xl flex items-center justify-center"
            style={{
              backgroundColor: "#07c160",
              opacity: isWechatPending ? 0.6 : 1,
            }}
            onClick={isWechatPending ? undefined : handleWechatLogin}
          >
            <Text className="text-base font-bold text-white">
              {wechatLoginMutation.isPending ? "登录中..." : "微信一键登录"}
            </Text>
          </View>

          {/* 次要按钮：获取手机号登录（必须通过 open-type="getPhoneNumber" 触发）*/}
          <Button
            openType="getPhoneNumber"
            onGetPhoneNumber={(e) => {
              if (e.detail.code) {
                handleGetPhoneNumber(e.detail.code);
              } else {
                Taro.showToast({ title: "未获取到手机号授权", icon: "none" });
              }
            }}
            disabled={isWechatPending}
            style={{
              backgroundColor: "#1677ff",
              color: "#ffffff",
              borderRadius: "9999px",
              height: "48px",
              fontSize: "15px",
              fontWeight: "bold",
              border: "none",
              opacity: isWechatPending ? 0.6 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {bindPhoneMutation.isPending ? "绑定中..." : "获取手机号登录"}
          </Button>

          {/* 分割线 */}
          <View className="flex flex-row items-center gap-3 my-1">
            <View
              className="flex-1 h-[0.5px]"
              style={{ backgroundColor: colors.divider }}
            />
            <Text className="text-xs" style={{ color: colors.fgSecondary }}>
              或
            </Text>
            <View
              className="flex-1 h-[0.5px]"
              style={{ backgroundColor: colors.divider }}
            />
          </View>

          {/* 邮箱密码登录入口 */}
          <View
            className="w-full h-12 rounded-3xl flex items-center justify-center"
            style={{ border: `0.5px solid ${colors.divider}` }}
            onClick={() => setView("email")}
          >
            <Text
              className="text-base font-medium"
              style={{ color: colors.fg }}
            >
              邮箱密码登录
            </Text>
          </View>
        </View>
      ) : (
        <View className="w-full flex flex-col gap-3">
          {/* Email / Password inputs */}
          <View
            className="w-full rounded-[10px] overflow-hidden"
            style={{ backgroundColor: colors.card }}
          >
            <View
              className="px-4 py-3"
              style={{ borderBottom: `0.5px solid ${colors.divider}` }}
            >
              <Text
                className="text-xs block mb-1"
                style={{ color: colors.fgSecondary }}
              >
                邮箱
              </Text>
              <Input
                value={email}
                onInput={(e) => setEmail(e.detail.value)}
                type="text"
                placeholder="请输入邮箱"
                placeholderStyle={`color: ${colors.placeholder}`}
                className="text-base w-full"
                style={{ color: colors.fg }}
              />
            </View>
            <View className="px-4 py-3">
              <Text
                className="text-xs block mb-1"
                style={{ color: colors.fgSecondary }}
              >
                密码
              </Text>
              <Input
                value={password}
                onInput={(e) => setPassword(e.detail.value)}
                password
                placeholder="请输入密码"
                placeholderStyle={`color: ${colors.placeholder}`}
                className="text-base w-full"
                style={{ color: colors.fg }}
              />
            </View>
          </View>

          {/* 登录按钮 */}
          <View
            className="w-full h-12 rounded-3xl flex items-center justify-center bg-primary"
            style={{ opacity: loginMutation.isPending ? 0.6 : 1 }}
            onClick={loginMutation.isPending ? undefined : handleEmailLogin}
          >
            <Text className="text-base font-bold text-white">
              {loginMutation.isPending ? "登录中..." : "登录"}
            </Text>
          </View>

          {/* 返回 */}
          <View
            className="w-full h-12 rounded-3xl flex items-center justify-center"
            onClick={() => setView("main")}
          >
            <Text className="text-sm" style={{ color: colors.fgSecondary }}>
              返回
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
