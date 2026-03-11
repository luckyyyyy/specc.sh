import {
  ChangePasswordInputSchema,
  ChangePasswordOutputSchema,
  UserProfileOutputSchema,
  UserUpdateInputSchema,
} from "@specc/types";
import { z } from "zod";
import { storage } from "@/storage/index";
import { AppError } from "@/trpc/errors";
import { protectedProcedure, router } from "@/trpc/init";
import { toUserOutput } from "./user.mapper";
import { userService } from "./user.service";

export const userRouter = router({
  getProfile: protectedProcedure
    .input(z.void())
    .output(UserProfileOutputSchema)
    .query(async ({ ctx }) => {
      const user = await userService.getById(ctx.userId);
      if (!user) {
        throw AppError.notFound(ctx.language, "errors.user.notFound");
      }
      return toUserOutput(user);
    }),

  updateProfile: protectedProcedure
    .input(UserUpdateInputSchema)
    .output(UserProfileOutputSchema)
    .mutation(async ({ input, ctx }) => {
      const updated = await userService.updateProfile(
        ctx.userId,
        { name: input.name, email: input.email, settings: input.settings },
        ctx.language,
      );
      return toUserOutput(updated);
    }),

  deleteAvatar: protectedProcedure
    .input(z.void())
    .output(UserProfileOutputSchema)
    .mutation(async ({ ctx }) => {
      const { updated, previousAvatarKey } = await userService.deleteAvatar(
        ctx.userId,
      );
      if (previousAvatarKey) {
        storage.deleteFile(previousAvatarKey).catch(() => {});
      }
      return toUserOutput(updated);
    }),

  changePassword: protectedProcedure
    .input(ChangePasswordInputSchema)
    .output(ChangePasswordOutputSchema)
    .mutation(async ({ input, ctx }) => {
      await userService.changePassword(
        ctx.userId,
        input.currentPassword,
        input.newPassword,
        ctx.language,
      );
      return { success: true };
    }),
});
