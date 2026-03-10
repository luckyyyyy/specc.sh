/**
 * Shared session / cookie utilities.
 * Used by tRPC context, upload routes, and auth service to avoid duplication.
 */
import { db } from "@/db/client";

export const SESSION_COOKIE_NAME = "SESSION_ID";
const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export const getCookieValue = (
  cookieHeader: string | undefined,
  name: string,
): string | undefined => {
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : undefined;
};

/**
 * Resolve userId from an already-parsed session ID string.
 * Returns undefined when the session is missing, invalid, or expired.
 */
export const resolveSessionUserId = async (
  sessionId: string | undefined,
): Promise<string | undefined> => {
  if (!sessionId) return undefined;
  const session = await db.session.findFirst({
    where: { id: sessionId, expiresAt: { gt: new Date() } },
    select: { userId: true },
  });
  return session?.userId;
};

const buildCookieHeader = (value: string, maxAge: number): string => {
  // Production: API and Web may be on different domains — SameSite=None + Secure is required
  // for cross-origin requests (e.g. credentials: "include"). Development keeps Lax (no HTTPS).
  const isProduction = process.env.NODE_ENV === "production";
  const secure = isProduction ? "; Secure" : "";
  const sameSite = isProduction ? "None" : "Lax";
  return `${SESSION_COOKIE_NAME}=${value}; HttpOnly; SameSite=${sameSite}; Max-Age=${maxAge}; Path=/${secure}`;
};

export const setSessionCookie = (resHeaders: Headers, sessionId: string) => {
  resHeaders.append(
    "Set-Cookie",
    buildCookieHeader(
      encodeURIComponent(sessionId),
      SESSION_COOKIE_MAX_AGE_SECONDS,
    ),
  );
};

export const clearSessionCookie = (resHeaders: Headers) => {
  resHeaders.append("Set-Cookie", buildCookieHeader("", 0));
};
