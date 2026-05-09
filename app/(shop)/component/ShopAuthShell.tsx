import { cookies } from "next/headers";

import { SHOP_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";

import ShopPhoneOtpGate from "@/app/(shop)/component/ShopPhoneOtpGate";

export default async function ShopAuthShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get(SHOP_AUTH_TOKEN_COOKIE)?.value;
  const isLoggedIn = Boolean(token?.trim());

  return (
    <>
      <ShopPhoneOtpGate initiallyLoggedIn={isLoggedIn} />
      {children}
    </>
  );
}
