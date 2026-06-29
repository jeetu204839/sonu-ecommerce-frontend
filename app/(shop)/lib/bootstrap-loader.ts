/** Dispatches when Bootstrap JS bundle has loaded (offcanvas, carousel, etc.). */
export const SHOP_BOOTSTRAP_READY_EVENT = "shop:bootstrap-ready";

type BootstrapOffcanvas = {
  getOrCreateInstance: (element: Element) => { show: () => void; hide: () => void };
  getInstance: (element: Element) => { show: () => void; hide: () => void; dispose: () => void } | null;
};

type BootstrapCarousel = {
  getOrCreateInstance: (
    element: Element,
    options?: { interval?: number; ride?: string | boolean; wrap?: boolean },
  ) => { cycle: () => void; dispose: () => void };
  getInstance: (element: Element) => { cycle: () => void; dispose: () => void } | null;
};

type BootstrapCollapse = {
  getOrCreateInstance: (element: Element) => { show: () => void; hide: () => void };
};

type BootstrapTab = {
  getOrCreateInstance: (element: Element) => { show: () => void };
};

type BootstrapDropdown = {
  getOrCreateInstance: (element: Element) => { show: () => void; hide: () => void };
};

export type ShopBootstrapApi = {
  Offcanvas: BootstrapOffcanvas;
  Carousel: BootstrapCarousel;
  Collapse: BootstrapCollapse;
  Tab: BootstrapTab;
  Dropdown: BootstrapDropdown;
};

function readWindowBootstrap(): ShopBootstrapApi | null {
  const bootstrap = (
    window as Window & {
      bootstrap?: {
        Offcanvas?: BootstrapOffcanvas;
        Carousel?: BootstrapCarousel;
        Collapse?: BootstrapCollapse;
        Tab?: BootstrapTab;
        Dropdown?: BootstrapDropdown;
      };
    }
  ).bootstrap;

  if (!bootstrap?.Offcanvas || !bootstrap?.Carousel) {
    return null;
  }

  return {
    Offcanvas: bootstrap.Offcanvas,
    Carousel: bootstrap.Carousel,
    Collapse: bootstrap.Collapse!,
    Tab: bootstrap.Tab!,
    Dropdown: bootstrap.Dropdown!,
  };
}

export function getShopBootstrap(): ShopBootstrapApi | null {
  if (typeof window === "undefined") {
    return null;
  }
  return readWindowBootstrap();
}

let bootstrapPromise: Promise<ShopBootstrapApi> | null = null;

export function loadShopBootstrap(): Promise<ShopBootstrapApi> {
  const existing = getShopBootstrap();
  if (existing) {
    return Promise.resolve(existing);
  }

  if (!bootstrapPromise) {
    bootstrapPromise = new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Bootstrap is only available in the browser."));
        return;
      }

      const finish = () => {
        const api = getShopBootstrap();
        if (api) {
          resolve(api);
          return true;
        }
        return false;
      };

      if (finish()) {
        return;
      }

      const onReady = () => {
        if (!finish()) {
          reject(new Error("Bootstrap bundle loaded but components are missing."));
        }
      };

      window.addEventListener(SHOP_BOOTSTRAP_READY_EVENT, onReady, { once: true });

      window.setTimeout(() => {
        if (!getShopBootstrap()) {
          window.removeEventListener(SHOP_BOOTSTRAP_READY_EVENT, onReady);
          reject(new Error("Bootstrap bundle did not load in time."));
        }
      }, 15000);
    });
  }

  return bootstrapPromise;
}
