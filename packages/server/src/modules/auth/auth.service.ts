import { db } from "@/db/client";
import { type Language, t } from "@/i18n";
import { toUserOutput, userService } from "@/modules/user";
import { workspaceService } from "@/modules/workspace";
import { AppError } from "@/trpc/errors";
import { hashPassword, verifyPassword } from "@/utils/password";

export { verifyPassword };

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
