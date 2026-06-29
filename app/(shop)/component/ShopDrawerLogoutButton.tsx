"use client";

import { hideShopNavDrawer } from "@/app/(shop)/lib/shop-nav-drawer";
import { shopLogoutAction } from "@/app/(shop)/user/actions";

type Props = Readonly<{
  className: string;
}>;

export default function ShopDrawerLogoutButton({ className }: Props) {
  return (
    <form action={shopLogoutAction} className="px-2">
      <button
        type="submit"
        className={className}
        onClick={() => {
          hideShopNavDrawer();
        }}
      >
        Logout
      </button>
    </form>
  );
}
