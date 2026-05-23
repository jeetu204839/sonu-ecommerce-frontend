import {
  apiEnvelopeUserMessage,
  DEFAULT_SHOP_COUNTRY_CODE,
} from "@/lib/api/api-message";
import { parseJsonText } from "@/lib/api/client";
import { API_BASE_URL } from "@/lib/config";
import type { AuthUserDto } from "@/lib/auth/types";

export type ShopUserApiEnvelope = {
  status?: boolean;
  success?: boolean;
  message?: string;
  data?: AuthUserDto | null;
  errors?: unknown;
};

function resolveApiUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is not set. Add it to .env.local (see .env.example).",
    );
  }
  const prefix = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${prefix}`;
}

function isEnvelopeSuccess(payload: ShopUserApiEnvelope | null): boolean {
  if (!payload) return false;
  if (payload.status === false || payload.success === false) return false;
  return payload.status === true || payload.success === true;
}

/**
 * GET /user — current shop customer (Bearer from phone OTP).
 */
export async function fetchShopUserProfile(
  authToken: string,
): Promise<AuthUserDto | null> {
  const token = authToken.trim();
  if (!token) return null;

  try {
    const res = await fetch(resolveApiUrl("/user"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const text = await res.text();
    if (!res.ok) return null;
    if (!text.trim()) return null;

    const payload = parseJsonText<ShopUserApiEnvelope>(text);
    if (!isEnvelopeSuccess(payload) || !payload?.data) return null;
    return payload.data;
  } catch {
    return null;
  }
}

export type UpdateShopUserProfileInput = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
};

function buildUpdateProfileBody(
  input: UpdateShopUserProfileInput,
): Record<string, string> | null {
  const body: Record<string, string> = {};
  const name = input.name?.trim();
  const email = input.email?.trim();
  const phoneNumber = input.phoneNumber?.trim();
  const countryCode =
    input.countryCode?.trim() || DEFAULT_SHOP_COUNTRY_CODE;

  if (name) body.name = name;
  if (email) body.email = email;
  if (phoneNumber) body.phoneNumber = phoneNumber;

  if (Object.keys(body).length === 0) return null;

  body.countryCode = countryCode;
  return body;
}

export type UpdateShopUserProfileResult = {
  ok: boolean;
  message: string;
  user?: AuthUserDto | null;
};

/**
 * PUT /user — update shop customer profile (Bearer from phone OTP).
 */
export async function updateShopUserProfile(
  authToken: string,
  input: UpdateShopUserProfileInput,
): Promise<UpdateShopUserProfileResult> {
  const token = authToken.trim();
  if (!token) {
    return { ok: false, message: "You are not signed in. Please sign in again." };
  }

  const body = buildUpdateProfileBody(input);
  if (!body) {
    return {
      ok: true,
      message: "No changes to save.",
    };
  }

  let res: Response;
  try {
    res = await fetch(resolveApiUrl("/user"), {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      message: "Could not reach the server. Check your connection and try again.",
    };
  }

  const text = await res.text();
  let payload: ShopUserApiEnvelope | null = null;
  try {
    payload = text.trim() ? parseJsonText<ShopUserApiEnvelope>(text) : null;
  } catch {
    return {
      ok: false,
      message: "Unexpected response from the server. Please try again later.",
    };
  }

  if (!res.ok) {
    return {
      ok: false,
      message: apiEnvelopeUserMessage(
        payload,
        `Update failed (${res.status}). Please try again.`,
      ),
    };
  }

  if (!isEnvelopeSuccess(payload)) {
    return {
      ok: false,
      message: apiEnvelopeUserMessage(
        payload,
        "Could not update your profile.",
      ),
    };
  }

  return {
    ok: true,
    message: apiEnvelopeUserMessage(
      payload,
      "Profile updated successfully.",
    ),
    user: payload?.data ?? null,
  };
}
