import { normalizeLanguage } from "@/i18n";
import {
  getCookieValue,
  resolveSessionUserId,
  resolveWechatSessionUserId,
  SESSION_COOKIE_NAME,
  WECHAT_SESSION_COOKIE_NAME,
} from "@/utils/session";

/**
 * Shared auth resolution logic used by both tRPC context and Hono middleware.
 * Parses cookie, resolves session userId, and determines request language.
 */
export const resolveRequestAuth = async (headers: {
  get(name: string): string | null | undefined;
}) => {
  const cookieHeader = headers.get("cookie") ?? undefined;
  const sessionId = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);
  const wechatSessionId = getCookieValue(
    cookieHeader,
    WECHAT_SESSION_COOKIE_NAME,
  );
  const userId = await resolveSessionUserId(sessionId);
  const wechatUserId = await resolveWechatSessionUserId(wechatSessionId);
  const languageHeader =
    headers.get("x-lang") ?? headers.get("accept-language");
  const language = normalizeLanguage(
    typeof languageHeader === "string" ? languageHeader : undefined,
  );
  return { userId, sessionId, wechatUserId, wechatSessionId, language };
};
