"use client";

import { useEffect } from "react";

/**
 * Font Awesome is used for icons across the shop UI but is not needed for first paint.
 * Load after hydration to reduce render-blocking CSS on the critical path.
 */
export default function ShopDeferredStyles() {
  useEffect(() => {
    const id = "shop-fontawesome-css";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://use.fontawesome.com/releases/v5.15.4/css/all.css";
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  }, []);

  return null;
}
