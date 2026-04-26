"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseJsonText } from "@/lib/api/client";
import { ADMIN_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";
import type { AdminLoginFormState } from "@/lib/auth/login-form-state";
import type { AuthLoginApiResponse } from "@/lib/auth/types";
import { API_BASE_URL } from "@/lib/config";

export async function adminLoginAction(
  _prev: AdminLoginFormState,
  formData: FormData,
): Promise<AdminLoginFormState> {
  const emailField = formData.get("email");
  const passwordField = formData.get("password");
  const email =
    typeof emailField === "string" ? emailField.trim() : "";
  const password = typeof passwordField === "string" ? passwordField : "";
  const remember = formData.get("remember_me") === "on";

  if (!email || !password) {
    return { ok: false, message: "Please enter your email and password." };
  }

  if (!API_BASE_URL) {
    return {
      ok: false,
      message:
        "Sign-in is unavailable: API_BASE_URL is not configured on the server.",
    };
  }

  let text: string;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
    text = await res.text();
  } catch {
    return {
      ok: false,
      message: "Could not reach the server. Check your connection and try again.",
    };
  }

  let json: AuthLoginApiResponse | null;
  try {
    json = parseJsonText<AuthLoginApiResponse>(text);
  } catch {
    return {
      ok: false,
      message: "Unexpected response from the server. Please try again later.",
    };
  }

  if (json?.status !== true || !json?.data?.token) {
    const msg =
      json?.message?.trim() || "Incorrect login details! Please try again.";
    return { ok: false, message: msg };
  }

  const maxAge = remember
    ? 60 * 60 * 24 * 30 // 30 days
    : 60 * 60 * 24; // 1 day

  const jar = await cookies();
  jar.set(ADMIN_AUTH_TOKEN_COOKIE, json.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  redirect("/admin/dashboard");
}
