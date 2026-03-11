import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import { formatZodError } from "@/utils/format-zod-error";
import type { AuthContext, Context, WechatAuthContext } from "./context";
import { AppError } from "./errors";

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error, ctx }) {
    if (error.cause instanceof ZodError) {
      const language = ctx?.language ?? "zh";
      return {
        ...shape,
        // ZodError.issues is a discriminated union; cast to access common fields
        message: formatZodError(
          error.cause.issues as Parameters<typeof formatZodError>[0],
          language,
        ),
      };
    }
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw AppError.unauthorized(ctx.language, "errors.common.unauthorized");
  }
  return next({ ctx: ctx as AuthContext });
});

export const wechatProtectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.wechatUserId) {
    throw AppError.unauthorized(ctx.language, "errors.common.unauthorized");
  }
  return next({ ctx: ctx as WechatAuthContext });
});
