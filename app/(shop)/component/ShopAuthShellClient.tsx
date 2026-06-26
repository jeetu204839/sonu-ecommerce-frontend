"use client";

import dynamic from "next/dynamic";

const ShopPhoneOtpGate = dynamic(
  () => import("@/app/(shop)/component/ShopPhoneOtpGate"),
  { ssr: false },
);

type Props = Readonly<{
  initiallyLoggedIn: boolean;
  children: React.ReactNode;
}>;

export default function ShopAuthShellClient({
  initiallyLoggedIn,
  children,
}: Props) {
  return (
    <>
      <ShopPhoneOtpGate initiallyLoggedIn={initiallyLoggedIn} />
      {children}
    </>
  );
}
