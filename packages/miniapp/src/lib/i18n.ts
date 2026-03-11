import { en, zh } from "@specc/i18n";
import Taro from "@tarojs/taro";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  zh: zh,
  en: en,
} as const;

const detectLang = (): string => {
  try {
    const stored = Taro.getStorageSync("miniapp_lang_mode");
    if (stored === "zh" || stored === "en") return stored;
    // getAppBaseInfo() is the recommended replacement for the deprecated
    // getSystemInfoSync() — safe to call at module init time
    const appInfo = Taro.getAppBaseInfo();
    const lang = appInfo.language ?? "zh";
    return lang.toLowerCase().startsWith("zh") ? "zh" : "en";
  } catch {
    return "zh";
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: detectLang(),
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

export default i18n;
