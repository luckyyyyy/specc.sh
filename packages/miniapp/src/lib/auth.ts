import type { AppRouter } from "@specc/server/trpc";
import Taro from "@tarojs/taro";
import { TRPCClientError } from "@trpc/client";

const TAB_PAGES = new Set([
  "pages/home/index",
  "pages/explore/index",
  "pages/workspace/index",
  "pages/profile/index",
]);

export const isUnauthorized = (error: unknown): boolean => {
  if (error instanceof TRPCClientError) {
    return (error as TRPCClientError<AppRouter>).data?.code === "UNAUTHORIZED";
  }
  return false;
};

/** 跳转到登录页，并把当前页路径作为 redirect 参数带上 */
export const navigateToLogin = () => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  // 已经在登录页，不重复跳
  if (!currentPage || currentPage.route === "pages/login/index") return;
  const redirect = encodeURIComponent(`/${currentPage.route}`);
  Taro.reLaunch({ url: `/pages/login/index?redirect=${redirect}` });
};

/** 登录成功后跳转：tabBar 页用 switchTab，其他用 navigateTo */
export const navigateAfterLogin = (redirect?: string | null) => {
  const target = redirect ?? "/pages/home/index";
  const bare = target.startsWith("/") ? target.slice(1) : target;
  if (TAB_PAGES.has(bare)) {
    Taro.switchTab({ url: target.startsWith("/") ? target : `/${target}` });
  } else {
    Taro.navigateTo({ url: target.startsWith("/") ? target : `/${target}` });
  }
};
