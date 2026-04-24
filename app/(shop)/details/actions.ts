"use server";

import { redirect } from "next/navigation";

export async function submitProductEnquiry(formData: FormData) {
  const honeypot = String(formData.get("company_url") ?? "").trim();
  if (honeypot) {
    redirect("/shop");
  }

  const slug = String(formData.get("productSlug") ?? "").trim();
  if (!slug) {
    redirect("/shop");
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !email || !phone || !description) {
    redirect(
      `/details?slug=${encodeURIComponent(slug)}&enquiryError=1`,
    );
  }

  // TODO: send email (Resend, etc.) or post to CRM with product context.
  void name;
  void email;
  void phone;
  void description;
  void String(formData.get("productName") ?? "");
  void String(formData.get("productSku") ?? "");

  redirect(
    `/details?slug=${encodeURIComponent(slug)}&enquiryThanks=1`,
  );
}
