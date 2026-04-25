"use server";

import { apiFetchJson } from "@/lib/api/client";

import type { ProductEnquiryFormState } from "./product-enquiry-state";

type SendEnquiryApiResponse = {
  status: boolean;
  message: string;
  data: unknown;
  errors: unknown;
};

function messageFromErrors(errors: unknown): string | null {
  if (errors == null) return null;
  if (typeof errors === "string" && errors.trim()) return errors.trim();
  if (typeof errors === "object") {
    const parts: string[] = [];
    for (const v of Object.values(errors as Record<string, unknown>)) {
      if (Array.isArray(v)) {
        for (const item of v) {
          if (item != null && String(item).trim()) parts.push(String(item).trim());
        }
      } else if (v != null && String(v).trim()) {
        parts.push(String(v).trim());
      }
    }
    if (parts.length) return parts.join(" ");
  }
  return null;
}

export async function submitProductEnquiry(
  _prev: ProductEnquiryFormState,
  formData: FormData,
): Promise<ProductEnquiryFormState> {
  if (String(formData.get("company_url") ?? "").trim()) {
    return {
      ok: true,
      message: "Thank you—your enquiry has been received.",
    };
  }

  const productIdRaw = String(formData.get("productId") ?? "").trim();
  const productId = Number.parseInt(productIdRaw, 10);
  if (!Number.isFinite(productId) || productId < 1) {
    return {
      ok: false,
      message: "Invalid product. Please refresh the page and try again.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !email || !phone || !description) {
    return {
      ok: false,
      message:
        "Please fill in your name, email, contact number, and description.",
    };
  }

  let payload: SendEnquiryApiResponse | null;
  try {
    payload = await apiFetchJson<SendEnquiryApiResponse>("/public/send-enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        name,
        email,
        contactNo: phone,
        remarks: description,
      }),
      cache: "no-store",
      throwOnError: false,
    });
  } catch (e) {
    return {
      ok: false,
      message:
        e instanceof Error
          ? e.message
          : "Unable to reach the server. Check your connection and try again.",
    };
  }

  if (!payload) {
    return {
      ok: false,
      message: "Empty response from server.",
    };
  }

  if (payload.status) {
    return {
      ok: true,
      message:
        payload.message?.trim() ||
        "Your enquiry has been sent successfully. We will get back to you soon.",
    };
  }

  const fromErrors = messageFromErrors(payload.errors);
  return {
    ok: false,
    message:
      fromErrors ||
      payload.message?.trim() ||
      "Could not send your enquiry. Please try again later.",
  };
}
