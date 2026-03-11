import type { Workspace } from "@/generated/prisma/client/client";
import { resolveRequestAuth } from "@/utils/request-auth";

export const createContext = async (req: Request, resHeaders: Headers) => {
  const { userId, sessionId, wechatUserId, wechatSessionId, language } =
    await resolveRequestAuth(req.headers);
  const workspaceKey = req.headers.get("x-workspace-id");
  const clientIp =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  return {
    userId,
    sessionId,
    wechatUserId,
    wechatSessionId,
    workspaceKey: workspaceKey ?? undefined,
    workspace: undefined as Workspace | undefined,
    language,
    clientIp,
    resHeaders,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

/** Narrowed context guaranteed by `requireUser` middleware — userId is always present */
export type AuthContext = Omit<Context, "userId"> & { userId: string };

/** Narrowed context for wechat-authenticated procedures */
export type WechatAuthContext = Omit<Context, "wechatUserId"> & {
  wechatUserId: string;
};
