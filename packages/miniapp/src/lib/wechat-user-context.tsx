import type { WechatUser } from "@specc/types";
import { createContext, useContext, useState } from "react";

type WechatUserContextValue = {
  /** undefined = still loading, null = not logged in, WechatUser = authenticated */
  wechatUser: WechatUser | null | undefined;
  setWechatUser: (user: WechatUser | null) => void;
};

const WechatUserContext = createContext<WechatUserContextValue>({
  wechatUser: undefined,
  setWechatUser: () => {},
});

export const WechatUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wechatUser, setWechatUser] = useState<WechatUser | null | undefined>(
    undefined,
  );
  return (
    <WechatUserContext.Provider value={{ wechatUser, setWechatUser }}>
      {children}
    </WechatUserContext.Provider>
  );
};

export const useWechatUser = () => useContext(WechatUserContext);
