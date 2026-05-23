"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import { updateShopProfileAction } from "./actions";
import {
  profileFormInitialState,
  type ProfileFormState,
} from "./profile-form-state";

type ProfileFormProps = Readonly<{
  initialName: string;
  initialEmail: string;
  initialPhoneNumber: string;
}>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary px-5 py-3 rounded-pill"
      disabled={pending}
    >
      <i className="fas fa-save me-2" aria-hidden="true" />
      {pending ? "Saving…" : "Save profile"}
    </button>
  );
}

export default function ProfileForm({
  initialName,
  initialEmail,
  initialPhoneNumber,
}: ProfileFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState<ProfileFormState, FormData>(
    updateShopProfileAction,
    profileFormInitialState,
  );

  useEffect(() => {
    if (state.ok && state.message.trim() !== "") {
      router.refresh();
    }
  }, [state.ok, state.message, router]);

  const showError = !state.ok && state.message.trim() !== "";
  const showSuccess = state.ok && state.message.trim() !== "";

  return (
    <form action={formAction} noValidate className="profile-form">
      <input type="hidden" name="countryCode" value="91" />
      {showError && (
        <div className="alert alert-warning border-0 shadow-sm" role="alert">
          <i className="fas fa-exclamation-triangle me-2" aria-hidden="true" />
          {typeof state.message === "string"
            ? state.message
            : "Something went wrong. Please try again."}
        </div>
      )}

      {showSuccess && (
        <div className="alert alert-success border-0 shadow-sm" role="status">
          <i className="fas fa-check-circle me-2" aria-hidden="true" />
          {typeof state.message === "string"
            ? state.message
            : "Profile updated successfully."}
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="profile-name" className="form-label fw-semibold">
            Full name
          </label>
          <input
            id="profile-name"
            name="name"
            type="text"
            className="form-control border-secondary"
            placeholder="Your name"
            defaultValue={initialName}
            autoComplete="name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="profile-email" className="form-label fw-semibold">
            Email
          </label>
          <input
            id="profile-email"
            name="email"
            type="email"
            className="form-control border-secondary"
            placeholder="you@example.com"
            defaultValue={initialEmail}
            autoComplete="email"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="profile-phone" className="form-label fw-semibold">
            Phone number
          </label>
          <input
            id="profile-phone"
            name="phoneNumber"
            type="tel"
            className="form-control border-secondary"
            placeholder="10-digit mobile number"
            defaultValue={initialPhoneNumber}
            autoComplete="tel"
          />
        </div>
        <div className="col-12">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
