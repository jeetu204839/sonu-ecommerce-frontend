"use client";

import type { Carousel, Collapse, Dropdown, Offcanvas, Tab } from "bootstrap";

/** Dispatches when Bootstrap JS is ready for carousel, offcanvas, etc. */
export const SHOP_BOOTSTRAP_READY_EVENT = "shop:bootstrap-ready";

type ShopBootstrapApi = {
  Carousel: typeof Carousel;
  Offcanvas: typeof Offcanvas;
  Collapse: typeof Collapse;
  Tab: typeof Tab;
  Dropdown: typeof Dropdown;
};

let bootstrapApi: ShopBootstrapApi | null = null;
let bootstrapPromise: Promise<ShopBootstrapApi> | null = null;

export function getShopBootstrap(): ShopBootstrapApi | null {
  return bootstrapApi;
}

export function loadShopBootstrap(): Promise<ShopBootstrapApi> {
  if (bootstrapApi) {
    return Promise.resolve(bootstrapApi);
  }

  if (!bootstrapPromise) {
    bootstrapPromise = import("bootstrap").then((bootstrap) => {
      bootstrapApi = {
        Carousel: bootstrap.Carousel,
        Offcanvas: bootstrap.Offcanvas,
        Collapse: bootstrap.Collapse,
        Tab: bootstrap.Tab,
        Dropdown: bootstrap.Dropdown,
      };
      window.dispatchEvent(new Event(SHOP_BOOTSTRAP_READY_EVENT));
      return bootstrapApi;
    });
  }

  return bootstrapPromise;
}
