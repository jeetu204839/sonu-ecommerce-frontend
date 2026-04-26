"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { adminLoginAction } from "@/app/auth/actions";
import { adminLoginInitialState } from "@/lib/auth/login-form-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn bg-olive btn-block"
      disabled={pending}
    >
      {pending ? "Signing in…" : "Sign me in"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(
    adminLoginAction,
    adminLoginInitialState,
  );

  const showError = !state.ok && state.message.trim() !== "";

  return (
    <div className="form-box" id="login-box">
      <div className="header">Sign In</div>
      <form action={formAction} noValidate>
        <div className="body bg-gray">
          {showError ? (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ marginBottom: 15 }}
            >
              {state.message}
            </div>
          ) : null}
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="form-group">
            <label className="checkbox-inline" style={{ fontWeight: "normal" }}>
              <input type="checkbox" name="remember_me" value="on" /> Remember
              me
            </label>
          </div>
        </div>
        <div className="footer">
          <SubmitButton />
          <p>
            <span className="text-muted">I forgot my password</span>
          </p>
          <span className="text-center" style={{ display: "block" }}>
            Register a new membership
          </span>
        </div>
      </form>
    </div>
  );
}
