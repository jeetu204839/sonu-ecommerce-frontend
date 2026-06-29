"use client";

import Script from "next/script";

import { SHOP_BOOTSTRAP_READY_EVENT } from "@/app/(shop)/lib/bootstrap-loader";

export default function BootstrapScript() {
  return (
    <Script
      id="shop-bootstrap-bundle"
      src="/js/bootstrap.bundle.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        window.dispatchEvent(new Event(SHOP_BOOTSTRAP_READY_EVENT));
      }}
    />
  );
}
