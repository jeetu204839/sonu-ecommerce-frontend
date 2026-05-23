import { DEFAULT_SHOP_COUNTRY_CODE } from "@/lib/api/api-message";

export const SHOP_USER_PROFILE_COOKIE = "shop_user_profile";

export type ShopProfileSnapshot = {
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
};

export function emptyShopProfileSnapshot(): ShopProfileSnapshot {
  return {
    name: "",
    email: "",
    phoneNumber: "",
    countryCode: DEFAULT_SHOP_COUNTRY_CODE,
  };
}

export function shopProfileFromUser(
  user: unknown,
  fallbackPhone = "",
): ShopProfileSnapshot {
  if (!user || typeof user !== "object") {
    const snap = emptyShopProfileSnapshot();
    if (fallbackPhone.trim()) snap.phoneNumber = fallbackPhone.trim();
    return snap;
  }

  const u = user as Record<string, unknown>;
  const name = typeof u.name === "string" ? u.name.trim() : "";
  const email = typeof u.email === "string" ? u.email.trim() : "";
  const phone =
    (typeof u.phoneNumber === "string" ? u.phoneNumber.trim() : "") ||
    fallbackPhone.trim();
  const countryCode =
    (typeof u.countryCode === "string" ? u.countryCode.trim() : "") ||
    DEFAULT_SHOP_COUNTRY_CODE;

  return { name, email, phoneNumber: phone, countryCode };
}

export function mergeShopProfileSnapshots(
  ...sources: (ShopProfileSnapshot | null | undefined)[]
): ShopProfileSnapshot {
  const out = emptyShopProfileSnapshot();
  for (const src of sources) {
    if (!src) continue;
    if (src.name.trim()) out.name = src.name.trim();
    if (src.email.trim()) out.email = src.email.trim();
    if (src.phoneNumber.trim()) out.phoneNumber = src.phoneNumber.trim();
    if (src.countryCode.trim()) out.countryCode = src.countryCode.trim();
  }
  return out;
}

export function encodeShopProfileSnapshot(
  snapshot: ShopProfileSnapshot,
): string {
  return JSON.stringify({
    name: snapshot.name.trim(),
    email: snapshot.email.trim(),
    phoneNumber: snapshot.phoneNumber.trim(),
    countryCode: snapshot.countryCode.trim() || DEFAULT_SHOP_COUNTRY_CODE,
  });
}

export function decodeShopProfileSnapshot(
  raw: string | undefined,
): ShopProfileSnapshot | null {
  if (!raw?.trim()) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      name: typeof parsed.name === "string" ? parsed.name.trim() : "",
      email: typeof parsed.email === "string" ? parsed.email.trim() : "",
      phoneNumber:
        typeof parsed.phoneNumber === "string" ? parsed.phoneNumber.trim() : "",
      countryCode:
        typeof parsed.countryCode === "string" && parsed.countryCode.trim()
          ? parsed.countryCode.trim()
          : DEFAULT_SHOP_COUNTRY_CODE,
    };
  } catch {
    return null;
  }
}
