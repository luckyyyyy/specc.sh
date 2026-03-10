import type { UserSettings } from "@specc/types";
import { db } from "@/db/client";
import { Prisma, type User } from "@/generated/prisma/client/client";
import { type Language } from "@/i18n";
import { AppError } from "@/trpc/errors";

export class UserService {
  async create(
    input: { name: string; email: string; passwordHash: string },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? db;
    return client.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: input.passwordHash,
        role: "user",
      },
    });
  }

  async getById(userId: string) {
    return db.user.findUnique({ where: { id: userId } });
  }

  async getByEmail(email: string) {
    return db.user.findUnique({ where: { email } });
  }

  async checkEmailExists(email: string, excludeUserId?: string) {
    const user = await db.user.findFirst({
      where: {
        email,
        ...(excludeUserId ? { id: { not: excludeUserId } } : {}),
      },
      select: { id: true },
    });
    return !!user;
  }

  private async getCurrentSettings(userId: string): Promise<UserSettings> {
    const current = await db.user.findUnique({
      where: { id: userId },
      select: { settings: true },
    });
    return (current?.settings as UserSettings | null) ?? {};
  }

  async updateProfile(
    userId: string,
    updates: {
      name?: string;
      email?: string;
      settings?: Partial<UserSettings> | null;
    },
    language: Language,
  ) {
    if (updates.email) {
      const emailExists = await this.checkEmailExists(updates.email, userId);
      if (emailExists) {
        throw AppError.badRequest(language, "errors.user.emailInUse");
      }
    }

    const data: Prisma.UserUpdateInput = {};
    if (updates.name !== undefined) data.name = updates.name.trim();
    if (updates.email !== undefined) data.email = updates.email.trim();

    if (updates.settings !== undefined) {
      if (updates.settings === null) {
        data.settings = Prisma.DbNull;
      } else {
        const currentSettings = await this.getCurrentSettings(userId);
        data.settings = { ...currentSettings, ...updates.settings };
      }
    }

    if (Object.keys(data).length === 0) {
      const user = await this.getById(userId);
      if (!user) {
        throw AppError.notFound(language, "errors.user.notFound");
      }
      return user;
    }

    return db.user.update({ where: { id: userId }, data });
  }

  /**
   * Update avatarKey in user settings.
   * Returns the previous avatarKey so callers can clean up the old file in storage.
   */
  async updateAvatarKey(
    userId: string,
    avatarKey: string,
  ): Promise<{
    updated: User;
    previousAvatarKey: string | null;
  }> {
    const { updated, previousValue: previousAvatarKey } =
      await this.patchAvatarKey(userId, avatarKey);
    return { updated, previousAvatarKey };
  }

  async deleteAvatar(userId: string): Promise<{
    updated: User;
    previousAvatarKey: string | null;
  }> {
    const { updated, previousValue: previousAvatarKey } =
      await this.patchAvatarKey(userId, null);
    return { updated, previousAvatarKey };
  }

  private async patchAvatarKey(userId: string, value: string | null) {
    const currentSettings = await this.getCurrentSettings(userId);
    const previousValue = currentSettings.avatarKey ?? null;
    const nextSettings = { ...currentSettings, avatarKey: value };
    const updated = await db.user.update({
      where: { id: userId },
      data: { settings: nextSettings },
    });
    return { updated, previousValue };
  }
}

export const userService = new UserService();
