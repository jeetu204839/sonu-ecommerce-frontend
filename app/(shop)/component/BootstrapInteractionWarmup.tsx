"use client";

import { useEffect } from "react";

import { loadShopBootstrap } from "@/app/(shop)/lib/bootstrap-loader";

/** Preloads Bootstrap on first interaction so offcanvas/accordion work immediately. */
export default function BootstrapInteractionWarmup() {
  useEffect(() => {
    const warm = () => {
      void loadShopBootstrap();
    };

    const opts: AddEventListenerOptions = { passive: true, once: true };
    window.addEventListener("pointerdown", warm, opts);
    window.addEventListener("keydown", warm, opts);

    return () => {
      window.removeEventListener("pointerdown", warm);
      window.removeEventListener("keydown", warm);
    };
  }, []);

  return null;
}
