"use server";

import { cookies } from "next/headers";

import { SHOP_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";
import {
  encodeShopProfileSnapshot,
  SHOP_USER_PROFILE_COOKIE,
  type ShopProfileSnapshot,
} from "@/lib/auth/shop-profile-snapshot";

const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

/**
 * Stores the Bearer token from verify-otp in an HttpOnly cookie.
 * Optional profile snapshot pre-fills the profile form after login.
 */
export async function setShopAuthSessionAction(
  token: string,
  profile?: ShopProfileSnapshot,
): Promise<{ ok: boolean; message?: string }> {
  const value = token.trim();
  if (!value) {
    return { ok: false, message: "Missing session token." };
  }

  const jar = await cookies();
  jar.set(SHOP_AUTH_TOKEN_COOKIE, value, sessionCookieOptions);

  if (profile) {
    jar.set(
      SHOP_USER_PROFILE_COOKIE,
      encodeShopProfileSnapshot(profile),
      sessionCookieOptions,
    );
  }

  return { ok: true };
}

export async function setShopProfileSnapshotAction(
  profile: ShopProfileSnapshot,
): Promise<void> {
  const jar = await cookies();
  jar.set(
    SHOP_USER_PROFILE_COOKIE,
    encodeShopProfileSnapshot(profile),
    sessionCookieOptions,
  );
}

export async function clearShopProfileSnapshotAction(): Promise<void> {
  const jar = await cookies();
  jar.delete(SHOP_USER_PROFILE_COOKIE);
}
