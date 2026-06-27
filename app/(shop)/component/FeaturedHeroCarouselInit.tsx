"use client";

import { useEffect } from "react";

import {
  getShopBootstrap,
  loadShopBootstrap,
  SHOP_BOOTSTRAP_READY_EVENT,
} from "@/app/(shop)/lib/bootstrap-loader";

type Props = Readonly<{
  enabled: boolean;
}>;

/** Initializes Bootstrap carousel after JS loads — no polling (avoids forced reflow). */
export default function FeaturedHeroCarouselInit({ enabled }: Props) {
  useEffect(() => {
    if (!enabled) return;

    const root = document.getElementById("carouselId");
    if (!root) return;

    const prefersReducedMotion = globalThis.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let disposed = false;
    let instance: ReturnType<
      NonNullable<ReturnType<typeof getShopBootstrap>>["Carousel"]["getInstance"]
    > | null = null;

    function initCarousel() {
      const Carousel = getShopBootstrap()?.Carousel;
      if (!Carousel || disposed) return;

      const previous = Carousel.getInstance(root!);
      previous?.dispose();

      instance = new Carousel(root!, {
        interval: 5000,
        ride: "carousel",
        wrap: true,
      });
      instance.cycle();
    }

    function onReady() {
      initCarousel();
    }

    if (getShopBootstrap()?.Carousel) {
      initCarousel();
    } else {
      globalThis.window.addEventListener(SHOP_BOOTSTRAP_READY_EVENT, onReady, {
        once: true,
      });
      void loadShopBootstrap().then(() => {
        if (!disposed) initCarousel();
      });
    }

    return () => {
      disposed = true;
      globalThis.window.removeEventListener(SHOP_BOOTSTRAP_READY_EVENT, onReady);
      instance?.dispose();
    };
  }, [enabled]);

  return null;
}
