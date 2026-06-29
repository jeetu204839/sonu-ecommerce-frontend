"use client";

import { useCallback, useRef } from "react";

import { loadShopBootstrap } from "@/app/(shop)/lib/bootstrap-loader";

const DRAWER_ID = "shopNavDrawer";

export default function ShopNavToggler() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openDrawer = useCallback(async () => {
    const api = await loadShopBootstrap();
    const drawer = document.getElementById(DRAWER_ID);
    if (!drawer) return;

    api.Offcanvas.getOrCreateInstance(drawer).show();
    buttonRef.current?.setAttribute("aria-expanded", "true");
    drawer.addEventListener(
      "hidden.bs.offcanvas",
      () => buttonRef.current?.setAttribute("aria-expanded", "false"),
      { once: true },
    );
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className="shop-nav-toggler shop-nav-toggler--on-dark py-2 px-3"
      aria-controls={DRAWER_ID}
      aria-label="Open menu"
      aria-expanded="false"
      onClick={() => {
        void openDrawer();
      }}
    >
      <span className="fa fa-bars text-white" aria-hidden="true" />
    </button>
  );
}
