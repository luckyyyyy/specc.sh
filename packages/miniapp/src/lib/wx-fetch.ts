import Taro from "@tarojs/taro";
import {
  getToken,
  getWechatToken,
  saveToken,
  saveWechatToken,
} from "./storage";

const SESSION_COOKIE_NAME = "SESSION_ID";
const WECHAT_SESSION_COOKIE_NAME = "WECHAT_SESSION_ID";

/**
 * 将 Taro.request 包装成符合 fetch 接口的函数，供 tRPC httpLink 使用。
 *
 * 认证方式：服务端使用 Cookie Session（SESSION_ID / WECHAT_SESSION_ID）。
 * - 每次请求时从 wx.storage 读取两种 session ID 并合并注入 Cookie 请求头
 * - 收到响应后检查 Set-Cookie 头，若包含新 session ID 则更新 wx.storage
 */
export const wxFetch: typeof fetch = (input, init) => {
  const url = typeof input === "string" ? input : (input as Request).url;
  const method = (
    init?.method ?? "GET"
  ).toUpperCase() as Taro.request.Option["method"];

  // tRPC 传进来的 body 可能是 string（JSON.stringify 后的）
  const data = init?.body ?? undefined;

  const rawHeaders =
    (init?.headers as Record<string, string> | undefined) ?? {};

  // 注入两种 session cookie
  const cookieParts: string[] = [];
  const storedSession = getToken();
  if (storedSession)
    cookieParts.push(
      `${SESSION_COOKIE_NAME}=${encodeURIComponent(storedSession)}`,
    );
  const storedWechatSession = getWechatToken();
  if (storedWechatSession)
    cookieParts.push(
      `${WECHAT_SESSION_COOKIE_NAME}=${encodeURIComponent(storedWechatSession)}`,
    );
  const cookieHeader =
    cookieParts.length > 0 ? { Cookie: cookieParts.join("; ") } : {};

  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        ...cookieHeader,
        ...rawHeaders,
      },
      success(res) {
        // 提取响应中的 Set-Cookie，更新本地存储的 session
        const headers = res.header as Record<string, string>;
        const setCookie = headers["set-cookie"] ?? headers["Set-Cookie"];
        if (setCookie) {
          // Use anchored pattern so SESSION_ID= does NOT match inside WECHAT_SESSION_ID=
          const match = setCookie.match(
            new RegExp(`(?:^|;\\s*)${SESSION_COOKIE_NAME}=([^;]+)`),
          );
          if (match) {
            const sessionValue = decodeURIComponent(match[1]);
            if (sessionValue) {
              saveToken(sessionValue);
            }
          }
          const wechatMatch = setCookie.match(
            new RegExp(`(?:^|;\\s*)${WECHAT_SESSION_COOKIE_NAME}=([^;]+)`),
          );
          if (wechatMatch) {
            const wechatSessionValue = decodeURIComponent(wechatMatch[1]);
            if (wechatSessionValue) {
              saveWechatToken(wechatSessionValue);
            }
          }
        }

        const responseData = res.data;

        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          statusText: String(res.statusCode),
          headers: {
            get(name: string): string | null {
              const h = res.header as Record<string, string>;
              return h[name] ?? h[name.toLowerCase()] ?? null;
            },
          } as Headers,
          json: async () => {
            if (typeof responseData === "object" && responseData !== null) {
              return responseData;
            }
            try {
              return JSON.parse(responseData as string);
            } catch {
              return responseData;
            }
          },
          text: async () => {
            if (typeof responseData === "string") return responseData;
            return JSON.stringify(responseData);
          },
        } as Response);
      },
      fail(err) {
        reject(new TypeError(err.errMsg ?? "Network request failed"));
      },
    });
  });
};
