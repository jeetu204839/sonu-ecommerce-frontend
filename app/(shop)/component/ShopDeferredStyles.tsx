"use client";

import { useEffect } from "react";

function loadDeferredStylesheet(id: string, href: string) {
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  link.media = "print";
  link.onload = () => {
    link.media = "all";
  };
  document.head.appendChild(link);
}

/**
 * Non-critical CSS — loaded after first paint to shorten the render-blocking path.
 */
export default function ShopDeferredStyles() {
  useEffect(() => {
    loadDeferredStylesheet("shop-style-css", "/css/style.css");
    loadDeferredStylesheet(
      "shop-fontawesome-css",
      "https://use.fontawesome.com/releases/v5.15.4/css/all.css",
    );
  }, []);

  return null;
}
