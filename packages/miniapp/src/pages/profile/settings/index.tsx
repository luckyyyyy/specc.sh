import { Text, View } from "@tarojs/components";
import { useAppSettings } from "@/lib/app-settings";
import { Check } from "@/lib/icons";
import type { LangMode, ThemeMode } from "@/lib/storage";
import { useNavBarTheme } from "@/lib/use-nav-bar-theme";
import { useThemeColors } from "@/lib/use-theme-colors";

function SectionHeader({ label }: { label: string }) {
  const colors = useThemeColors();
  return (
    <Text
      className="text-sm pt-4 px-4 pb-1 block uppercase"
      style={{ color: colors.fgSecondary }}
    >
      {label}
    </Text>
  );
}

function OptionRow({
  label,
  selected,
  onTap,
  isLast,
}: {
  label: string;
  selected: boolean;
  onTap: () => void;
  isLast?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <View
      onClick={onTap}
      className="flex flex-row items-center px-4 h-11"
      style={{
        backgroundColor: colors.card,
        borderBottom: isLast ? "none" : `0.5px solid ${colors.divider}`,
      }}
    >
      <Text className="flex-1 text-base" style={{ color: colors.fg }}>
        {label}
      </Text>
      {selected && <Check size={18} color="#007aff" />}
    </View>
  );
}

export default function SettingsPage() {
  const { themeMode, setThemeMode, langMode, setLangMode } = useAppSettings();
  const colors = useThemeColors();
  useNavBarTheme();

  const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
    { value: "auto", label: "跟随系统" },
    { value: "light", label: "浅色" },
    { value: "dark", label: "深色" },
  ];

  const LANG_OPTIONS: { value: LangMode; label: string }[] = [
    { value: "auto", label: "跟随系统" },
    { value: "zh", label: "中文" },
    { value: "en", label: "English" },
  ];

  return (
    <View
      className="min-h-screen pb-5"
      style={{ backgroundColor: colors.surface }}
    >
      {/* Theme section */}
      <SectionHeader label="主题" />
      <View
        className="rounded-[10px] overflow-hidden mx-4"
        style={{ backgroundColor: colors.card }}
      >
        {THEME_OPTIONS.map(({ value, label }, idx) => (
          <OptionRow
            key={value}
            label={label}
            selected={themeMode === value}
            onTap={() => setThemeMode(value)}
            isLast={idx === THEME_OPTIONS.length - 1}
          />
        ))}
      </View>

      {/* Language section */}
      <SectionHeader label="语言" />
      <View
        className="rounded-[10px] overflow-hidden mx-4"
        style={{ backgroundColor: colors.card }}
      >
        {LANG_OPTIONS.map(({ value, label }, idx) => (
          <OptionRow
            key={value}
            label={label}
            selected={langMode === value}
            onTap={() => setLangMode(value)}
            isLast={idx === LANG_OPTIONS.length - 1}
          />
        ))}
      </View>
    </View>
  );
}
