"use server";

import { redirect } from "next/navigation";

export async function submitContactForm(formData: FormData) {
  const honeypot = String(formData.get("company_website") ?? "").trim();
  if (honeypot) {
    redirect("/contact");
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    redirect("/contact?error=1");
  }

  // TODO: integrate email (Resend, etc.) or internal CRM.
  void phone;
  void subject;

  redirect("/contact?thanks=1");
}
