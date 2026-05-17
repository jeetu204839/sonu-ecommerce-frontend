"use server";

import { revalidatePath } from "next/cache";

import { updateLeadReview } from "@/lib/admin/lead/api";
import { LEAD_TIER_OPTIONS, type UpdateLeadFormState } from "@/lib/admin/lead/update-lead-form-state";
import type { LeadTier } from "@/lib/admin/lead/types";

const VALID_TIERS = new Set<string>(LEAD_TIER_OPTIONS);

function parsePositiveInt(value: FormDataEntryValue | null): number | null {
  const raw = typeof value === "string" ? value.trim() : "";
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

export async function updateLeadReviewAction(
  _prev: UpdateLeadFormState,
  formData: FormData,
): Promise<UpdateLeadFormState> {
  const userId = parsePositiveInt(formData.get("userId"));
  if (userId == null) {
    return { ok: false, message: "Invalid user id." };
  }

  const tierField = formData.get("leadTier");
  const leadTier =
    typeof tierField === "string" ? tierField.trim().toUpperCase() : "";
  if (!VALID_TIERS.has(leadTier)) {
    return { ok: false, message: "Please select a valid lead tier." };
  }

  const notesField = formData.get("notes");
  const notes = typeof notesField === "string" ? notesField.trim() : "";

  const result = await updateLeadReview(userId, {
    leadTier: leadTier as LeadTier,
    notes,
  });

  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  revalidatePath(`/admin/leads/leads/${userId}`);

  return {
    ok: true,
    message: result.message?.trim() || "Lead updated successfully.",
  };
}
