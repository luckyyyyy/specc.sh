import Taro from "@tarojs/taro";

const KEYS = {
  SESSION: "auth_session",
  USER: "miniapp_user",
  WECHAT_SESSION: "wechat_session",
  WECHAT_USER: "wechat_user",
  LANG_MODE: "miniapp_lang_mode",
  THEME_MODE: "miniapp_theme_mode",
} as const;

/** 保存服务端 session ID（从 Set-Cookie 响应头提取）*/
export function saveToken(sessionId: string) {
  Taro.setStorageSync(KEYS.SESSION, sessionId);
}

/** 获取已存储的 session ID */
export function getToken(): string | null {
  try {
    return Taro.getStorageSync(KEYS.SESSION) || null;
  } catch {
    return null;
  }
}

export function removeToken() {
  Taro.removeStorageSync(KEYS.SESSION);
}

export function saveUser(user: object) {
  Taro.setStorageSync(KEYS.USER, JSON.stringify(user));
}

export function getUser<T = unknown>(): T | null {
  try {
    const raw = Taro.getStorageSync(KEYS.USER);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function removeUser() {
  Taro.removeStorageSync(KEYS.USER);
}

export function saveWechatToken(sessionId: string) {
  Taro.setStorageSync(KEYS.WECHAT_SESSION, sessionId);
}

export function getWechatToken(): string | null {
  try {
    return Taro.getStorageSync(KEYS.WECHAT_SESSION) || null;
  } catch {
    return null;
  }
}

export function removeWechatToken() {
  Taro.removeStorageSync(KEYS.WECHAT_SESSION);
}

export function saveWechatUser(user: object) {
  Taro.setStorageSync(KEYS.WECHAT_USER, JSON.stringify(user));
}

export function getWechatUser<T = unknown>(): T | null {
  try {
    const raw = Taro.getStorageSync(KEYS.WECHAT_USER);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function removeWechatUser() {
  Taro.removeStorageSync(KEYS.WECHAT_USER);
}

export type LangMode = "auto" | "zh" | "en";
export type ThemeMode = "auto" | "light" | "dark";

export function saveLangMode(mode: LangMode) {
  Taro.setStorageSync(KEYS.LANG_MODE, mode);
}

export function getLangMode(): LangMode {
  try {
    const v = Taro.getStorageSync(KEYS.LANG_MODE);
    if (v === "zh" || v === "en" || v === "auto") return v;
    return "auto";
  } catch {
    return "auto";
  }
}

export function saveThemeMode(mode: ThemeMode) {
  Taro.setStorageSync(KEYS.THEME_MODE, mode);
}

export function getThemeMode(): ThemeMode {
  try {
    const v = Taro.getStorageSync(KEYS.THEME_MODE);
    if (v === "light" || v === "dark" || v === "auto") return v;
    return "auto";
  } catch {
    return "auto";
  }
}
