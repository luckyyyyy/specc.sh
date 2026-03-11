/**
 * 小程序对象存储工具
 *
 * 将存储 key 转换为可访问的完整 URL。
 * 前端通过 TARO_APP_STORAGE_BASE_URL 环境变量 + key 拼接完整访问地址。
 */

const STORAGE_BASE_URL = (
  (process.env.TARO_APP_STORAGE_BASE_URL as string | undefined) ?? ""
).replace(/\/$/, "");

/**
 * 将对象存储 key 转换为完整访问 URL
 * @param key 存储键，如 "avatars/xxx.jpg"，或已是完整 URL / 微信临时路径
 */
export const getStorageUrl = (key?: string | null): string => {
  if (!key) return "";
  // 已是完整 URL、微信临时文件路径 — 直接透传
  if (
    key.startsWith("http://") ||
    key.startsWith("https://") ||
    key.startsWith("wxfile://") ||
    key.startsWith("tmp_")
  ) {
    return key;
  }
  return `${STORAGE_BASE_URL}/${key}`;
};
