import { cookies } from "next/headers";

import { parseJsonText } from "@/lib/api/client";
import { ADMIN_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";
import { API_BASE_URL } from "@/lib/config";

/**
 * Authenticated GET to the backend admin API (Bearer token from admin login cookie).
 * Admin-only — not used by shop routes.
 */
export async function adminApiGetEnvelope<TData>(
  pathWithQuery: string,
): Promise<
  | { ok: true; data: TData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const token = (await cookies()).get(ADMIN_AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    return {
      ok: false,
      message: "You need to sign in to view this page.",
      unauthorized: true,
    };
  }

  if (!API_BASE_URL) {
    return { ok: false, message: "API_BASE_URL is not configured." };
  }

  const prefix = pathWithQuery.startsWith("/") ? pathWithQuery : `/${pathWithQuery}`;
  const url = `${API_BASE_URL}${prefix}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  } catch {
    return { ok: false, message: "Could not reach the server." };
  }

  const text = await res.text();

  if (res.status === 401) {
    return {
      ok: false,
      message: "Your session has expired. Please sign in again.",
      unauthorized: true,
    };
  }

  type Envelope = { status: boolean; message: string; data: TData | null };

  let envelope: Envelope | null;
  try {
    envelope = parseJsonText<Envelope>(text);
  } catch {
    return { ok: false, message: "Invalid response from the server." };
  }

  if (!envelope) {
    return { ok: false, message: "Empty response from the server." };
  }

  if (!envelope.status || envelope.data == null) {
    const msg =
      envelope.message?.trim() || "The request could not be completed.";
    return { ok: false, message: msg };
  }

  return { ok: true, data: envelope.data };
}

/**
 * Authenticated POST with JSON body to the backend admin API (Bearer token from cookie).
 */
export async function adminApiPostEnvelope<TData>(
  pathWithQuery: string,
  body: Record<string, unknown>,
): Promise<
  | { ok: true; data: TData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const token = (await cookies()).get(ADMIN_AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    return {
      ok: false,
      message: "You need to sign in to view this page.",
      unauthorized: true,
    };
  }

  if (!API_BASE_URL) {
    return { ok: false, message: "API_BASE_URL is not configured." };
  }

  const prefix = pathWithQuery.startsWith("/")
    ? pathWithQuery
    : `/${pathWithQuery}`;
  const url = `${API_BASE_URL}${prefix}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return { ok: false, message: "Could not reach the server." };
  }

  const text = await res.text();

  if (res.status === 401) {
    return {
      ok: false,
      message: "Your session has expired. Please sign in again.",
      unauthorized: true,
    };
  }

  type Envelope = { status: boolean; message: string; data: TData | null };

  let envelope: Envelope | null;
  try {
    envelope = parseJsonText<Envelope>(text);
  } catch {
    return { ok: false, message: "Invalid response from the server." };
  }

  if (!envelope) {
    return { ok: false, message: "Empty response from the server." };
  }

  if (!envelope.status || envelope.data == null) {
    const msg =
      envelope.message?.trim() || "The request could not be completed.";
    return { ok: false, message: msg };
  }

  return { ok: true, data: envelope.data };
}

/**
 * Authenticated PUT with JSON body to the backend admin API (Bearer token from cookie).
 */
export async function adminApiPutEnvelope<TData>(
  pathWithQuery: string,
  body: Record<string, unknown>,
): Promise<
  | { ok: true; data: TData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const token = (await cookies()).get(ADMIN_AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    return {
      ok: false,
      message: "You need to sign in to view this page.",
      unauthorized: true,
    };
  }

  if (!API_BASE_URL) {
    return { ok: false, message: "API_BASE_URL is not configured." };
  }

  const prefix = pathWithQuery.startsWith("/")
    ? pathWithQuery
    : `/${pathWithQuery}`;
  const url = `${API_BASE_URL}${prefix}`;

  let res: Response;
  try {
    res = await fetch(url, {
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
    return { ok: false, message: "Could not reach the server." };
  }

  const text = await res.text();

  if (res.status === 401) {
    return {
      ok: false,
      message: "Your session has expired. Please sign in again.",
      unauthorized: true,
    };
  }

  type Envelope = { status: boolean; message: string; data: TData | null };

  let envelope: Envelope | null;
  try {
    envelope = parseJsonText<Envelope>(text);
  } catch {
    return { ok: false, message: "Invalid response from the server." };
  }

  if (!envelope) {
    return { ok: false, message: "Empty response from the server." };
  }

  if (!envelope.status || envelope.data == null) {
    const msg =
      envelope.message?.trim() || "The request could not be completed.";
    return { ok: false, message: msg };
  }

  return { ok: true, data: envelope.data };
}

/**
 * Authenticated POST using multipart/form-data (e.g. file uploads).
 * Do not set Content-Type — fetch sets multipart boundary automatically.
 */
export async function adminApiPostFormDataEnvelope<TData>(
  pathWithQuery: string,
  body: FormData,
): Promise<
  | { ok: true; data: TData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const token = (await cookies()).get(ADMIN_AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    return {
      ok: false,
      message: "You need to sign in to view this page.",
      unauthorized: true,
    };
  }

  if (!API_BASE_URL) {
    return { ok: false, message: "API_BASE_URL is not configured." };
  }

  const prefix = pathWithQuery.startsWith("/")
    ? pathWithQuery
    : `/${pathWithQuery}`;
  const url = `${API_BASE_URL}${prefix}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
      cache: "no-store",
    });
  } catch {
    return { ok: false, message: "Could not reach the server." };
  }

  const text = await res.text();

  if (res.status === 401) {
    return {
      ok: false,
      message: "Your session has expired. Please sign in again.",
      unauthorized: true,
    };
  }

  type Envelope = { status: boolean; message: string; data: TData | null };

  let envelope: Envelope | null;
  try {
    envelope = parseJsonText<Envelope>(text);
  } catch {
    return { ok: false, message: "Invalid response from the server." };
  }

  if (!envelope) {
    return { ok: false, message: "Empty response from the server." };
  }

  if (!envelope.status || envelope.data == null) {
    const msg =
      envelope.message?.trim() || "The request could not be completed.";
    return { ok: false, message: msg };
  }

  return { ok: true, data: envelope.data };
}

/**
 * Authenticated PUT using multipart/form-data (e.g. category update with optional image).
 * Do not set Content-Type — fetch sets multipart boundary automatically.
 */
export async function adminApiPutFormDataEnvelope<TData>(
  pathWithQuery: string,
  body: FormData,
): Promise<
  | { ok: true; data: TData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const token = (await cookies()).get(ADMIN_AUTH_TOKEN_COOKIE)?.value;
  if (!token) {
    return {
      ok: false,
      message: "You need to sign in to view this page.",
      unauthorized: true,
    };
  }

  if (!API_BASE_URL) {
    return { ok: false, message: "API_BASE_URL is not configured." };
  }

  const prefix = pathWithQuery.startsWith("/")
    ? pathWithQuery
    : `/${pathWithQuery}`;
  const url = `${API_BASE_URL}${prefix}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
      cache: "no-store",
    });
  } catch {
    return { ok: false, message: "Could not reach the server." };
  }

  const text = await res.text();

  if (res.status === 401) {
    return {
      ok: false,
      message: "Your session has expired. Please sign in again.",
      unauthorized: true,
    };
  }

  type Envelope = { status: boolean; message: string; data: TData | null };

  let envelope: Envelope | null;
  try {
    envelope = parseJsonText<Envelope>(text);
  } catch {
    return { ok: false, message: "Invalid response from the server." };
  }

  if (!envelope) {
    return { ok: false, message: "Empty response from the server." };
  }

  if (!envelope.status || envelope.data == null) {
    const msg =
      envelope.message?.trim() || "The request could not be completed.";
    return { ok: false, message: msg };
  }

  return { ok: true, data: envelope.data };
}
