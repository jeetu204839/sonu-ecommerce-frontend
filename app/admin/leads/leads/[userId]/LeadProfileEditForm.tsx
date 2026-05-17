"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import { leadTierDisplayLabel } from "@/app/admin/leads/format";
import {
  LEAD_TIER_OPTIONS,
  updateLeadFormInitialState,
  type UpdateLeadFormState,
} from "@/lib/admin/lead/update-lead-form-state";
import type { LeadTier } from "@/lib/admin/lead/types";

import { updateLeadReviewAction } from "./actions";

type Props = Readonly<{
  userId: number;
  initialLeadTier: LeadTier | string;
  initialNotes: string | null;
}>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-success btn-sm" disabled={pending}>
      {pending ? (
        <>
          <i className="fa fa-spinner fa-spin margin-r-5" />
          Saving…
        </>
      ) : (
        <>
          <i className="fa fa-save margin-r-5" />
          Save lead
        </>
      )}
    </button>
  );
}

export default function LeadProfileEditForm({
  userId,
  initialLeadTier,
  initialNotes,
}: Props) {
  const router = useRouter();
  const [state, formAction] = useActionState<UpdateLeadFormState, FormData>(
    updateLeadReviewAction,
    updateLeadFormInitialState,
  );

  const tierValue = initialLeadTier.trim().toUpperCase();
  const selectedTier = LEAD_TIER_OPTIONS.includes(tierValue as LeadTier)
    ? (tierValue as LeadTier)
    : "COLD";

  useEffect(() => {
    if (state.ok && state.message.trim() !== "") {
      router.refresh();
    }
  }, [state.ok, state.message, router]);

  const showError = !state.ok && state.message.trim() !== "";
  const showSuccess = state.ok && state.message.trim() !== "";

  return (
    <form action={formAction} className="lead-profile-edit-form">
      <input type="hidden" name="userId" value={userId} />

      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="lead-tier">Lead tier</label>
            <select
              id="lead-tier"
              name="leadTier"
              className="form-control"
              defaultValue={selectedTier}
              required
            >
              {LEAD_TIER_OPTIONS.map((tier) => (
                <option key={tier} value={tier}>
                  {leadTierDisplayLabel(tier)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="lead-notes">Notes</label>
        <textarea
          id="lead-notes"
          name="notes"
          className="form-control"
          rows={3}
          placeholder="e.g. Called customer — interested in bulk order"
          defaultValue={initialNotes?.trim() ?? ""}
          maxLength={2000}
        />
      </div>

      {showError ? (
        <p className="text-danger small mb-2" role="alert">
          <i className="fa fa-exclamation-circle margin-r-5" />
          {state.message}
        </p>
      ) : null}
      {showSuccess ? (
        <p className="text-success small mb-2" role="status">
          <i className="fa fa-check margin-r-5" />
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
