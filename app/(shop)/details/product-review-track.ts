"use client";

import { trackProductReview } from "./actions";

/** Coalesce Strict Mode double-mount / parallel calls within this window (ms). */
const DEDUPE_MS = 3000;

const gates = new Map<number, { promise: Promise<boolean>; expiresAt: number }>();

function getActiveGate(productId: number): Promise<boolean> | undefined {
  const gate = gates.get(productId);
  if (!gate) return undefined;
  if (Date.now() > gate.expiresAt) {
    gates.delete(productId);
    return undefined;
  }
  return gate.promise;
}

/** Allow a new attempt after OTP login (same tab, same product page). */
export function clearProductReviewGate(productId: number): void {
  gates.delete(productId);
}

/**
 * Records one product review per navigation burst (not once per tab forever).
 */
export function trackProductReviewOnce(productId: number): Promise<boolean> {
  if (!Number.isFinite(productId) || productId < 1) {
    return Promise.resolve(false);
  }

  const active = getActiveGate(productId);
  if (active !== undefined) {
    return active;
  }

  const promise = trackProductReview(productId).then((result) => result.recorded);

  gates.set(productId, {
    promise,
    expiresAt: Date.now() + DEDUPE_MS,
  });

  return promise;
}
