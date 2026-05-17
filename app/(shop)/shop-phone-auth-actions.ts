"use server";

import { cookies } from "next/headers";

import { SHOP_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";

/**
 * Stores the Bearer token from verify-otp in an HttpOnly cookie.
 */
export async function setShopAuthSessionAction(
  token: string,
): Promise<{ ok: boolean; message?: string }> {
  const value = token.trim();
  if (!value) {
    return { ok: false, message: "Missing session token." };
  }

  const jar = await cookies();
  jar.set(SHOP_AUTH_TOKEN_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true };
}
