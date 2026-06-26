"use client";

import { useEffect } from "react";

type BootstrapCarouselCtor = {
  getInstance: (element: Element) => { dispose: () => void } | null;
  new (
    element: Element,
    options?: { interval?: number; ride?: string | boolean; wrap?: boolean },
  ): { cycle: () => void; dispose: () => void };
};

function getBootstrapCarousel(): BootstrapCarouselCtor | undefined {
  return globalThis.window?.bootstrap?.Carousel;
}

type Props = Readonly<{
  enabled: boolean;
}>;

/** Initializes Bootstrap carousel after hydration — markup is server-rendered for LCP. */
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
    let instance: { dispose: () => void } | null = null;
    let timer: number | undefined;

    function tryInit() {
      const Carousel = getBootstrapCarousel();
      if (!Carousel || disposed) return false;

      const previous = Carousel.getInstance(root!);
      previous?.dispose();

      instance = new Carousel(root!, {
        interval: 5000,
        ride: "carousel",
        wrap: true,
      });
      instance.cycle();
      return true;
    }

    if (!tryInit()) {
      const started = Date.now();
      timer = globalThis.window.setInterval(() => {
        if (tryInit() || Date.now() - started >= 8000) {
          if (timer !== undefined) {
            globalThis.window.clearInterval(timer);
          }
        }
      }, 50);
    }

    return () => {
      disposed = true;
      if (timer !== undefined) {
        globalThis.window.clearInterval(timer);
      }
      instance?.dispose();
    };
  }, [enabled]);

  return null;
}

declare global {
  interface Window {
    bootstrap?: {
      Carousel?: BootstrapCarouselCtor;
    };
  }
}
