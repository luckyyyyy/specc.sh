import { Input, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useNavBarTheme } from "@/lib/use-nav-bar-theme";
import { useThemeColors } from "@/lib/use-theme-colors";
import { useUser } from "@/lib/user-context";

export default function EditProfilePage() {
  const { user, setUser } = useUser();
  const colors = useThemeColors();
  useNavBarTheme();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const updateMutation = trpc.user.updateProfile.useMutation({
    onSuccess: (updated) => {
      setUser(updated);
      Taro.showToast({ title: "保存成功", icon: "success" });
      setTimeout(() => Taro.navigateBack(), 800);
    },
    onError: (err) => {
      Taro.showToast({ title: err.message || "保存失败", icon: "error" });
    },
  });

  const handleSave = () => {
    const trimName = name.trim();
    if (!trimName) {
      Taro.showToast({ title: "姓名不能为空", icon: "none" });
      return;
    }
    updateMutation.mutate({
      name: trimName,
      email: email.trim() || undefined,
    });
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
        {/* Name field */}
        <View
          className="px-4 py-3"
          style={{ borderBottom: `0.5px solid ${colors.divider}` }}
        >
          <Text
            className="text-xs uppercase block mb-1.5"
            style={{ color: colors.fgSecondary }}
          >
            姓名
          </Text>
          <View
            className="rounded-[6px] px-2.5 h-9 flex items-center"
            style={{ backgroundColor: colors.input }}
          >
            <Input
              value={name}
              onInput={(e) => setName(e.detail.value)}
              placeholder="请输入姓名"
              placeholderStyle={`color: ${colors.placeholder}`}
              className="text-base w-full"
              style={{ color: colors.fg }}
            />
          </View>
        </View>

        {/* Email field */}
        <View className="px-4 py-3">
          <Text
            className="text-xs uppercase block mb-1.5"
            style={{ color: colors.fgSecondary }}
          >
            邮箱
          </Text>
          <View
            className="rounded-[6px] px-2.5 h-9 flex items-center"
            style={{ backgroundColor: colors.input }}
          >
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
        </View>
      </View>

      {/* Save Button */}
      <View className="mx-4 mt-4">
        <View
          className="h-11 rounded-[10px] flex items-center justify-center bg-[#007aff]"
          onClick={updateMutation.isPending ? undefined : handleSave}
          style={{ opacity: updateMutation.isPending ? 0.6 : 1 }}
        >
          <Text className="text-base font-semibold text-white">
            {updateMutation.isPending ? "保存中..." : "保存"}
          </Text>
        </View>
      </View>
    </View>
  );
}
