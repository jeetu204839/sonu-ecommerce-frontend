"use server";

import { redirect } from "next/navigation";

export async function submitReviewFeedbackForm(formData: FormData) {
  const honeypot = String(formData.get("company_website") ?? "").trim();
  if (honeypot) {
    redirect("/review-feedback");
  }

  const name = String(formData.get("name") ?? "").trim();
  const productName = String(formData.get("product_name") ?? "").trim();
  const rating = String(formData.get("rating") ?? "").trim();
  const feedback = String(formData.get("feedback") ?? "").trim();

  if (!name || !productName || !rating || !feedback) {
    redirect("/review-feedback?error=1");
  }

  // TODO: integrate email, CRM, or review moderation queue.
  void String(formData.get("company") ?? "").trim();
  void String(formData.get("city_state") ?? "").trim();

  redirect("/review-feedback?thanks=1");
}
