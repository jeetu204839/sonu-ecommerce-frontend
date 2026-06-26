import { cookies } from "next/headers";

import { SHOP_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";

import ShopAuthShellClient from "@/app/(shop)/component/ShopAuthShellClient";

export default async function ShopAuthShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get(SHOP_AUTH_TOKEN_COOKIE)?.value;
  const isLoggedIn = Boolean(token?.trim());

  return (
    <ShopAuthShellClient initiallyLoggedIn={isLoggedIn}>
      {children}
    </ShopAuthShellClient>
  );
}
