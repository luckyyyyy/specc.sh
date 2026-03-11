import { z } from "zod";
import { UserSchema, UserSettingsPatchSchema } from "./user";
import { WorkspaceSchema } from "./workspace";
export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const AuthOutputSchema = z.object({
  user: UserSchema,
  defaultWorkspaceSlug: z.string(),
});

export const LogoutOutputSchema = z.object({
  success: z.boolean(),
});

export const UserProfileOutputSchema = UserSchema;

export const UserUpdateInputSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  settings: UserSettingsPatchSchema.nullable().optional(),
});

export const ChangePasswordInputSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export const ChangePasswordOutputSchema = z.object({
  success: z.boolean(),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;
export type RegisterInput = z.infer<typeof RegisterInputSchema>;
export type AuthOutput = z.infer<typeof AuthOutputSchema>;
export type LogoutOutput = z.infer<typeof LogoutOutputSchema>;
export type UserProfileOutput = z.infer<typeof UserProfileOutputSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordInputSchema>;
export type ChangePasswordOutput = z.infer<typeof ChangePasswordOutputSchema>;

const WORKSPACE_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WORKSPACE_SLUG_MESSAGE =
  "Slug can only contain lowercase letters, digits, and hyphens, and cannot start or end with a hyphen";

export const WorkspaceOutputSchema = WorkspaceSchema;

export const CreateWorkspaceInputSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  slug: z
    .string()
    .min(1, "Slug cannot be empty")
    .regex(WORKSPACE_SLUG_REGEX, WORKSPACE_SLUG_MESSAGE)
    .optional(),
  description: z.string().optional(),
});

export const UpdateWorkspaceInputSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z
    .string()
    .min(1)
    .regex(WORKSPACE_SLUG_REGEX, WORKSPACE_SLUG_MESSAGE)
    .optional(),
  description: z.string().nullable().optional(),
});

export type WorkspaceOutput = z.infer<typeof WorkspaceOutputSchema>;
export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceInputSchema>;
export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceInputSchema>;
