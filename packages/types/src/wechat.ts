import { z } from "zod";

export const WechatUserSchema = z.object({
  id: z.string(),
  openid: z.string(),
  unionid: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  avatarKey: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type WechatUser = z.infer<typeof WechatUserSchema>;

/** Input for wx.login code exchange (get openid) */
export const WechatLoginInputSchema = z.object({
  code: z.string().min(1),
});

/** Input for getting phone number via wx.getPhoneNumber button */
export const WechatGetPhoneInputSchema = z.object({
  code: z.string().min(1),
});

export const WechatAuthOutputSchema = z.object({
  wechatUser: WechatUserSchema,
});

export type WechatLoginInput = z.infer<typeof WechatLoginInputSchema>;
export type WechatGetPhoneInput = z.infer<typeof WechatGetPhoneInputSchema>;
export type WechatAuthOutput = z.infer<typeof WechatAuthOutputSchema>;
