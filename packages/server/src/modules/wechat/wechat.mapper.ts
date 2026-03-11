import type { WechatUser } from "@/generated/prisma/client/client";

export const toWechatUserOutput = (row: WechatUser) => ({
  id: row.id,
  openid: row.openid,
  unionid: row.unionid ?? null,
  phoneNumber: row.phoneNumber ?? null,
  name: row.name ?? null,
  avatarKey: row.avatarKey ?? null,
  createdAt: row.createdAt.toISOString(),
});
