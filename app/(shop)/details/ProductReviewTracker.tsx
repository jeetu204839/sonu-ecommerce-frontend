"use client";

import { useEffect } from "react";

import { SHOP_AUTH_READY_EVENT } from "@/lib/auth/constants";

import {
  clearProductReviewGate,
  trackProductReviewOnce,
} from "./product-review-track";

type ProductReviewTrackerProps = Readonly<{
  productId: number;
  isLoggedIn: boolean;
}>;

export default function ProductReviewTracker({
  productId,
  isLoggedIn,
}: ProductReviewTrackerProps) {
  useEffect(() => {
    if (!Number.isFinite(productId) || productId < 1) {
      return;
    }

    if (isLoggedIn) {
      void trackProductReviewOnce(productId);
    }

    const onAuthReady = () => {
      clearProductReviewGate(productId);
      void trackProductReviewOnce(productId);
    };
    window.addEventListener(SHOP_AUTH_READY_EVENT, onAuthReady);
    return () => window.removeEventListener(SHOP_AUTH_READY_EVENT, onAuthReady);
  }, [productId, isLoggedIn]);

  return null;
}
