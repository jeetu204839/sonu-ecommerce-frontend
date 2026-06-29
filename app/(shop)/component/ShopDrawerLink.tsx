"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { hideShopNavDrawer } from "@/app/(shop)/lib/shop-nav-drawer";

type ShopDrawerLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  children: ReactNode;
  onClick?: ComponentProps<typeof Link>["onClick"];
};

/** Drawer link — closes offcanvas without blocking Next.js navigation. */
export default function ShopDrawerLink({
  children,
  onClick,
  ...props
}: ShopDrawerLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        hideShopNavDrawer();
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
