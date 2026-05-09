import { parseJsonText } from "@/lib/api/client";
import { PUBLIC_API_BASE_URL } from "@/lib/config";

import type {
  PhoneOtpApiEnvelope,
  PhoneOtpRequestSuccessData,
  PhoneOtpVerifySuccessData,
} from "./phone-otp-types";

/** Browser-safe base URL (see next.config env fallback from API_BASE_URL). */
function assertShopApiBaseUrl(): string {
  const base = PUBLIC_API_BASE_URL.trim();
  if (!base) {
    throw new Error(
      "API base URL is not set. Add API_BASE_URL or NEXT_PUBLIC_API_BASE_URL to .env.local (see .env.example), then restart next dev.",
    );
  }
  return base.replace(/\/+$/, "");
}

function backendUrl(path: string): string {
  const base = assertShopApiBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export type PhoneOtpRequestResult = {
  ok: boolean;
  status: number;
  envelope: PhoneOtpApiEnvelope<PhoneOtpRequestSuccessData> | null;
  parseError?: string;
};

export type PhoneOtpVerifyResult = {
  ok: boolean;
  status: number;
  envelope: PhoneOtpApiEnvelope<PhoneOtpVerifySuccessData> | null;
  parseError?: string;
};

/**
 * POST /auth/phone/request-otp — browser (shop storefront).
 */
export async function requestShopPhoneOtp(
  phoneNumber: string,
): Promise<PhoneOtpRequestResult> {
  let res: Response;
  try {
    res = await fetch(backendUrl("/auth/phone/request-otp"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      status: 0,
      envelope: null,
      parseError: "Could not reach the server. Check your connection.",
    };
  }

  const text = await res.text();
  try {
    const envelope =
      parseJsonText<PhoneOtpApiEnvelope<PhoneOtpRequestSuccessData>>(text);
    return { ok: res.ok, status: res.status, envelope };
  } catch {
    return {
      ok: false,
      status: res.status,
      envelope: null,
      parseError:
        "Unexpected response from the server. Please try again later.",
    };
  }
}

/**
 * POST /auth/phone/verify-otp — browser (shop storefront).
 */
export async function verifyShopPhoneOtp(input: {
  phoneNumber: string;
  challengeId: string;
  otp: string;
}): Promise<PhoneOtpVerifyResult> {
  let res: Response;
  try {
    res = await fetch(backendUrl("/auth/phone/verify-otp"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: input.phoneNumber,
        challengeId: input.challengeId,
        otp: input.otp,
      }),
      cache: "no-store",
    });
  } catch {
    return {
      ok: false,
      status: 0,
      envelope: null,
      parseError: "Could not reach the server. Check your connection.",
    };
  }

  const text = await res.text();
  try {
    const envelope =
      parseJsonText<PhoneOtpApiEnvelope<PhoneOtpVerifySuccessData>>(text);
    return { ok: res.ok, status: res.status, envelope };
  } catch {
    return {
      ok: false,
      status: res.status,
      envelope: null,
      parseError:
        "Unexpected response from the server. Please try again later.",
    };
  }
}
