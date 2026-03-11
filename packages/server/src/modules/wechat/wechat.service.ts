import { db } from "@/db/client";
import type { Language } from "@/i18n";
import { Logger } from "@/logger";
import { AppError } from "@/trpc/errors";

const logger = new Logger("WechatService");

// Read at call-time to guarantee dotenv has already populated process.env
const getAppId = () => process.env.WECHAT_APP_ID ?? "";
const getAppSecret = () => process.env.WECHAT_APP_SECRET ?? "";

interface WechatCode2SessionResponse {
  openid?: string;
  session_key?: string;
  unionid?: string;
  errcode?: number;
  errmsg?: string;
}

interface WechatGetPhoneResponse {
  errcode: number;
  errmsg: string;
  phone_info?: {
    phoneNumber: string;
    purePhoneNumber: string;
    countryCode: string;
  };
}

async function code2Session(
  code: string,
): Promise<{ openid: string; unionid?: string }> {
  const appId = getAppId();
  const appSecret = getAppSecret();
  logger.log(`code2Session appId=${appId ? appId : "(empty!)"}`);
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
  const resp = await fetch(url);
  const data = (await resp.json()) as WechatCode2SessionResponse;
  logger.log(`code2Session response: ${JSON.stringify(data)}`);
  if (data.errcode || !data.openid) {
    throw new Error(
      `wx.login failed: errcode=${data.errcode} errmsg=${data.errmsg}`,
    );
  }
  return { openid: data.openid, unionid: data.unionid };
}

async function getAccessToken(): Promise<string> {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${getAppId()}&secret=${getAppSecret()}`;
  const resp = await fetch(url);
  const data = (await resp.json()) as {
    access_token?: string;
    errcode?: number;
    errmsg?: string;
  };
  if (!data.access_token)
    throw new Error(`Failed to get access_token: ${data.errmsg}`);
  return data.access_token;
}

async function getPhoneNumber(code: string): Promise<string> {
  const accessToken = await getAccessToken();
  const resp = await fetch(
    `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    },
  );
  const data = (await resp.json()) as WechatGetPhoneResponse;
  if (data.errcode !== 0 || !data.phone_info?.phoneNumber) {
    throw new Error(`getPhoneNumber failed: ${data.errmsg}`);
  }
  return data.phone_info.phoneNumber;
}

export class WechatService {
  async createSession(wechatUserId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);
    const session = await db.wechatSession.create({
      data: { wechatUserId, expiresAt },
    });
    return session.id;
  }

  async deleteSession(sessionId: string) {
    await db.wechatSession.deleteMany({ where: { id: sessionId } });
  }

  async getById(id: string) {
    return db.wechatUser.findUnique({ where: { id } });
  }

  /**
   * Login via wx.login code — returns or creates wechat user.
   */
  async loginWithCode(code: string, language: Language) {
    let sessionInfo: { openid: string; unionid?: string };
    try {
      sessionInfo = await code2Session(code);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`loginWithCode failed: ${msg}`);
      throw AppError.badRequest(language, "errors.auth.wechatLoginFailed");
    }
    const { openid, unionid } = sessionInfo;

    const existing = await db.wechatUser.findUnique({ where: { openid } });
    if (existing) return existing;

    return db.wechatUser.create({
      data: { openid, unionid },
    });
  }

  /**
   * Bind phone number to the current wechat user via getPhoneNumber code.
   */
  async bindPhone(wechatUserId: string, code: string, language: Language) {
    let phoneNumber: string;
    try {
      phoneNumber = await getPhoneNumber(code);
    } catch {
      throw AppError.badRequest(language, "errors.auth.wechatPhoneFailed");
    }

    return db.wechatUser.update({
      where: { id: wechatUserId },
      data: { phoneNumber },
    });
  }
}

export const wechatService = new WechatService();
