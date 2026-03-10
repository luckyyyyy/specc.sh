import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { db } from "@/db/client";

const scryptAsync = promisify(scrypt);

import { type Language, t } from "@/i18n";
import { toUserOutput, userService } from "@/modules/user";
import { workspaceService } from "@/modules/workspace";
import { AppError } from "@/trpc/errors";

const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16).toString("hex");
  const hash = ((await scryptAsync(password, salt, 64)) as Buffer).toString(
    "hex",
  );
  return `${salt}:${hash}`;
};

export const verifyPassword = async (
  password: string,
  stored: string,
): Promise<boolean> => {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return timingSafeEqual(Buffer.from(hash, "hex"), derived);
};

export class AuthService {
  async createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);
    const session = await db.session.create({ data: { userId, expiresAt } });
    return session.id;
  }

  async deleteSession(sessionId: string) {
    await db.session.deleteMany({ where: { id: sessionId } });
  }

  async login(email: string, password: string) {
    const user = await userService.getByEmail(email);
    if (!user || !(await verifyPassword(password, user.passwordHash)))
      return null;
    const defaultWorkspaceSlug = await workspaceService.getDefaultSlugForUser(
      user.id,
    );
    return { user: toUserOutput(user), defaultWorkspaceSlug };
  }

  async registerUser(
    input: { email: string; password: string },
    language: Language,
  ) {
    const existing = await userService.getByEmail(input.email);
    if (existing)
      throw AppError.badRequest(language, "errors.auth.emailAlreadyRegistered");

    const name = input.email.split("@")[0] ?? input.email;
    const workspaceName = `${name}${t(language, "workspace.defaultNameSuffix")}`;
    const passwordHash = await hashPassword(input.password);

    return db.$transaction(async (tx) => {
      const user = await userService.create(
        {
          name,
          email: input.email,
          passwordHash,
        },
        tx,
      );
      const workspace = await workspaceService.create(
        {
          name: workspaceName,
          description: t(language, "workspace.defaultDesc"),
        },
        user.id,
        tx,
      );

      return {
        user: toUserOutput(user),
        defaultWorkspaceSlug: workspace.slug,
      };
    });
  }
}

export const authService = new AuthService();
