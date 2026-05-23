"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DEFAULT_SHOP_COUNTRY_CODE } from "@/lib/api/api-message";
import { shopAuthLogout } from "@/lib/api/shop-auth";
import {
  fetchShopUserProfile,
  updateShopUserProfile,
} from "@/lib/api/shop-user";
import { SHOP_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";
import {
  clearShopProfileSnapshotAction,
  setShopProfileSnapshotAction,
} from "@/app/(shop)/shop-phone-auth-actions";
import {
  decodeShopProfileSnapshot,
  mergeShopProfileSnapshots,
  shopProfileFromUser,
  SHOP_USER_PROFILE_COOKIE,
} from "@/lib/auth/shop-profile-snapshot";

import type { ProfileFormState } from "./profile-form-state";

async function shopAuthToken(): Promise<string | null> {
  const token = (await cookies()).get(SHOP_AUTH_TOKEN_COOKIE)?.value?.trim();
  return token || null;
}

export async function getShopProfileForPage(): Promise<{
  loggedIn: boolean;
  name: string;
  email: string;
  phoneNumber: string;
}> {
  const token = await shopAuthToken();
  if (!token) {
    return { loggedIn: false, name: "", email: "", phoneNumber: "" };
  }

  const jar = await cookies();
  const cookieSnapshot = decodeShopProfileSnapshot(
    jar.get(SHOP_USER_PROFILE_COOKIE)?.value,
  );
  const apiUser = await fetchShopUserProfile(token);
  const merged = mergeShopProfileSnapshots(
    apiUser ? shopProfileFromUser(apiUser) : null,
    cookieSnapshot,
  );

  return {
    loggedIn: true,
    name: merged.name,
    email: merged.email,
    phoneNumber: merged.phoneNumber,
  };
}

export async function updateShopProfileAction(
  _prev: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const token = await shopAuthToken();
  if (!token) {
    return {
      ok: false,
      message: "Please sign in with your phone number to update your profile.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
  const countryCode =
    String(formData.get("countryCode") ?? "").trim() ||
    DEFAULT_SHOP_COUNTRY_CODE;

  const result = await updateShopUserProfile(token, {
    name,
    email,
    phoneNumber,
    countryCode,
  });

  if (result.ok) {
    const saved = mergeShopProfileSnapshots(
      result.user ? shopProfileFromUser(result.user) : null,
      { name, email, phoneNumber, countryCode },
    );
    await setShopProfileSnapshotAction(saved);
  }

  const message =
    typeof result.message === "string"
      ? result.message
      : "Could not update your profile.";

  return { ok: result.ok, message };
}

export async function shopLogoutAction(): Promise<void> {
  const token = await shopAuthToken();
  if (token) {
    await shopAuthLogout(token);
  }

  const jar = await cookies();
  jar.delete(SHOP_AUTH_TOKEN_COOKIE);
  await clearShopProfileSnapshotAction();
  redirect("/");
}
