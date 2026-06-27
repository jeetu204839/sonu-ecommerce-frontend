"use client";

import { useEffect } from "react";

/** Loads icon + legacy template CSS after first paint to avoid render blocking. */
export default function DeferredShopStyles() {
  useEffect(() => {
    const load = () => {
      void import("@/app/(shop)/shop-legacy.css");
      void import("@/app/(shop)/fontawesome.css");
    };

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? (cb: () => void) =>
            window.requestIdleCallback(cb, { timeout: 2000 })
        : (cb: () => void) => window.setTimeout(cb, 1);

    schedule(load);
  }, []);

  return null;
}
