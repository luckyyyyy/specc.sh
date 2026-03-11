import {
  authRouter,
  userRouter,
  wechatRouter,
  workspaceRouter,
} from "@/modules/index";
import { router } from "./init";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  workspace: workspaceRouter,
  wechat: wechatRouter,
});

export type AppRouter = typeof appRouter;
