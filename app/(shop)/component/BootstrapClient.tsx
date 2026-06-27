"use client";

import { useEffect } from "react";

import { loadShopBootstrap } from "@/app/(shop)/lib/bootstrap-loader";

/** Loads only required Bootstrap JS modules after first paint (no CDN). */
export default function BootstrapClient() {
  useEffect(() => {
    const schedule =
      typeof window.requestIdleCallback === "function"
        ? (cb: () => void) =>
            window.requestIdleCallback(cb, { timeout: 2500 })
        : (cb: () => void) => window.setTimeout(cb, 1);

    schedule(() => {
      void loadShopBootstrap();
    });
  }, []);

  return null;
}
