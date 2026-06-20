"use server";

import { redirect } from "next/navigation";

export async function submitContactForm(formData: FormData) {
  const honeypot = String(formData.get("company_website") ?? "").trim();
  if (honeypot) {
    redirect("/contact");
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    redirect("/contact?error=1");
  }

  // TODO: integrate email (Resend, etc.) or internal CRM.
  void String(formData.get("company") ?? "").trim();
  void String(formData.get("phone") ?? "").trim();
  void String(formData.get("city") ?? "").trim();
  void String(formData.get("state") ?? "").trim();
  void String(formData.get("country") ?? "").trim();
  void String(formData.get("product_requirement") ?? "").trim();
  void String(formData.get("quantity") ?? "").trim();

  redirect("/contact?thanks=1");
}
