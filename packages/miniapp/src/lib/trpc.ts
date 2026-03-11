import type { AppRouter } from "@specc/server/trpc";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { wxFetch } from "./wx-fetch";

// tRPC React hooks（trpc.xxx.useQuery / trpc.xxx.useMutation）
export const trpc = createTRPCReact<AppRouter>();

// API 地址：开发时指向本地 server（端口 4000）
// 生产时替换为正式域名
const API_BASE_URL =
  (process.env.TARO_APP_API_URL as string | undefined) ??
  "http://localhost:4000";

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${API_BASE_URL}/trpc`,
      // WeChat mini programs don't support Set-Cookie via JS (browser restriction only),
      // but Taro.request gives us access to response headers.
      // wx-fetch.ts extracts the SESSION_ID from Set-Cookie and stores it in wx.storage,
      // then injects it as a Cookie header on every request.
      fetch: wxFetch,
    }),
  ],
});
