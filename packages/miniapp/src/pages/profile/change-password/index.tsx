import { Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useNavBarTheme } from "@/lib/use-nav-bar-theme";
import { useThemeColors } from "@/lib/use-theme-colors";

export default function ChangePasswordPage() {
  const colors = useThemeColors();
  useNavBarTheme();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeMutation = trpc.user.changePassword.useMutation({
    onSuccess: () => {
      Taro.showToast({ title: "密码已更新", icon: "success" });
      setTimeout(() => Taro.navigateBack(), 800);
    },
    onError: (err) => {
      Taro.showToast({
        title: err.message || "修改失败",
        icon: "error",
        duration: 2000,
      });
    },
  });

  const handleSave = () => {
    if (!currentPassword) {
      Taro.showToast({ title: "请输入当前密码", icon: "none" });
      return;
    }
    if (newPassword.length < 8) {
      Taro.showToast({ title: "新密码至少 8 位", icon: "none" });
      return;
    }
    if (newPassword !== confirmPassword) {
      Taro.showToast({ title: "两次输入的密码不一致", icon: "none" });
      return;
    }
    changeMutation.mutate({ currentPassword, newPassword });
  };

  return (
    <View
      className="min-h-screen pt-4 pb-5"
      style={{ backgroundColor: colors.surface }}
    >
      {/* Form Card */}
      <View
        className="mx-4 rounded-[10px] overflow-hidden"
        style={{ backgroundColor: colors.card }}
      >
        {/* Current password */}
        <View
          className="px-4 py-3"
          style={{ borderBottom: `0.5px solid ${colors.divider}` }}
        >
          <Text
            className="text-xs uppercase block mb-1.5"
            style={{ color: colors.fgSecondary }}
          >
            当前密码
          </Text>
          <View
            className="rounded-[6px] px-2.5 h-9 flex items-center"
            style={{ backgroundColor: colors.input }}
          >
            <Input
              value={currentPassword}
              onInput={(e) => setCurrentPassword(e.detail.value)}
              password
              placeholder="请输入当前密码"
              placeholderStyle={`color: ${colors.placeholder}`}
              className="text-base w-full"
              style={{ color: colors.fg }}
            />
          </View>
        </View>

        {/* New password */}
        <View
          className="px-4 py-3"
          style={{ borderBottom: `0.5px solid ${colors.divider}` }}
        >
          <Text
            className="text-xs uppercase block mb-1.5"
            style={{ color: colors.fgSecondary }}
          >
            新密码
          </Text>
          <View
            className="rounded-[6px] px-2.5 h-9 flex items-center"
            style={{ backgroundColor: colors.input }}
          >
            <Input
              value={newPassword}
              onInput={(e) => setNewPassword(e.detail.value)}
              password
              placeholder="至少 8 位"
              placeholderStyle={`color: ${colors.placeholder}`}
              className="text-base w-full"
              style={{ color: colors.fg }}
            />
          </View>
        </View>

        {/* Confirm password */}
        <View className="px-4 py-3">
          <Text
            className="text-xs uppercase block mb-1.5"
            style={{ color: colors.fgSecondary }}
          >
            确认新密码
          </Text>
          <View
            className="rounded-[6px] px-2.5 h-9 flex items-center"
            style={{ backgroundColor: colors.input }}
          >
            <Input
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.detail.value)}
              password
              placeholder="再次输入新密码"
              placeholderStyle={`color: ${colors.placeholder}`}
              className="text-base w-full"
              style={{ color: colors.fg }}
            />
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View className="mx-4 mt-4">
        <View
          className="h-11 rounded-[10px] flex items-center justify-center bg-[#007aff]"
          onClick={changeMutation.isPending ? undefined : handleSave}
          style={{ opacity: changeMutation.isPending ? 0.6 : 1 }}
        >
          <Text className="text-base font-semibold text-white">
            {changeMutation.isPending ? "保存中..." : "保存"}
          </Text>
        </View>
      </View>
    </View>
  );
}
