import { parseJsonText } from "@/lib/api/client";
import { API_BASE_URL } from "@/lib/config";

export type ProductReviewSource = "WEB";

type ProductReviewApiResponse = {
  status?: boolean;
  success?: boolean;
  message?: string;
  data?: unknown;
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

function isSuccessPayload(payload: ProductReviewApiResponse | null): boolean {
  if (!payload) return true;
  if (payload.status === false || payload.success === false) return false;
  if (payload.status === true || payload.success === true) return true;
  return true;
}

/**
 * POST /public/products/review — authenticated lead-gen (Bearer from phone OTP).
 */
export async function recordProductReview(
  productId: number,
  authToken: string,
  source: ProductReviewSource = "WEB",
): Promise<boolean> {
  const token = authToken.trim();
  if (!token || !Number.isFinite(productId) || productId < 1) return false;

  try {
    const res = await fetch(resolveApiUrl("/public/products/review"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: String(productId),
        source,
      }),
      cache: "no-store",
    });

    const text = await res.text();
    if (!res.ok) return false;
    if (!text.trim()) return true;

    const payload = parseJsonText<ProductReviewApiResponse>(text);
    return isSuccessPayload(payload);
  } catch {
    return false;
  }
}
