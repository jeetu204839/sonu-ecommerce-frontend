"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { setShopAuthSessionAction } from "@/app/(shop)/shop-phone-auth-actions";
import {
  requestShopPhoneOtp,
  verifyShopPhoneOtp,
} from "@/lib/auth/phone-otp-api";

type ShopPhoneOtpGateProps = Readonly<{
  initiallyLoggedIn: boolean;
}>;

const IN_PHONE = /^\d{10}$/;
/** First popup after load; same delay before each reminder until verified. */
//const REMINDER_MS = 2 * 60 * 1000; // use `6 * 1000` temporarily to test reminders

const REMINDER_MS = 6 * 1000;

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "").slice(-10);
}

export default function ShopPhoneOtpGate({
  initiallyLoggedIn,
}: ShopPhoneOtpGateProps) {
  const router = useRouter();
  const titleId = useId();
  /** Browser timer ids are numbers (avoid NodeJS.Timeout mismatch). */
  const reminderTimerRef = useRef<number | undefined>(undefined);

  const [loggedIn, setLoggedIn] = useState(initiallyLoggedIn);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(initiallyLoggedIn);
  }, [initiallyLoggedIn]);

  function clearReminderTimer() {
    if (reminderTimerRef.current !== undefined) {
      window.clearTimeout(reminderTimerRef.current);
      reminderTimerRef.current = undefined;
    }
  }

  /** Schedule one reminder: open modal after REMINDER_MS (used on load and after dismiss). */
  function scheduleNextReminder() {
    clearReminderTimer();
    reminderTimerRef.current = window.setTimeout(() => {
      setModalOpen(true);
      reminderTimerRef.current = undefined;
    }, REMINDER_MS);
  }

  /** First reminder after delay; cleanup when verified or unmount. Re-show uses scheduleNextReminder from close handler only — avoids setInterval + Strict Mode clearing the interval silently. */
  useEffect(() => {
    if (loggedIn) {
      clearReminderTimer();
      return;
    }
    scheduleNextReminder();
    return () => clearReminderTimer();
  }, [loggedIn]);

  const [phone, setPhone] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [requestPending, setRequestPending] = useState(false);
  const [verifyPending, setVerifyPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneDigits = useMemo(() => normalizePhone(phone), [phone]);

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!IN_PHONE.test(phoneDigits)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setRequestPending(true);
    try {
      const result = await requestShopPhoneOtp(phoneDigits);
      if (result.parseError) {
        setError(result.parseError);
        return;
      }

      const env = result.envelope;
      const payload = env?.data;
      const ok =
        result.ok &&
        env?.status === true &&
        payload &&
        payload.challengeId != null &&
        payload.challengeId !== "";

      if (!ok) {
        const msg =
          env?.message?.trim() || "Could not send OTP. Please try again.";
        setError(msg);
        return;
      }

      setChallengeId(String(payload.challengeId));
      setOtp("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setRequestPending(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!challengeId) {
      setError("Request OTP first.");
      return;
    }

    const code = otp.replace(/\D/g, "");
    if (code.length < 4 || code.length > 8) {
      setError("Enter the OTP you received.");
      return;
    }

    setVerifyPending(true);
    try {
      const result = await verifyShopPhoneOtp({
        phoneNumber: phoneDigits,
        challengeId,
        otp: code,
      });

      if (result.parseError) {
        setError(result.parseError);
        return;
      }

      const env = result.envelope;
      const token =
        env?.data && typeof env.data.token === "string"
          ? env.data.token.trim()
          : "";

      const ok = result.ok && env?.status === true && token !== "";

      if (!ok) {
        const msg =
          env?.message?.trim() ||
          "Invalid or expired OTP. Please try again.";
        setError(msg);
        return;
      }

      const session = await setShopAuthSessionAction(token);
      if (!session.ok) {
        setError(session.message ?? "Could not save your session.");
        return;
      }

      setLoggedIn(true);
      clearReminderTimer();
      setModalOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setVerifyPending(false);
    }
  }

  function handleCloseModal() {
    setModalOpen(false);
    scheduleNextReminder();
  }

  if (loggedIn) {
    return null;
  }

  if (!modalOpen) {
    return null;
  }

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{ zIndex: 1080, backgroundColor: "rgba(33, 37, 41, 0.65)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-secondary shadow-lg">
          <div className="modal-header border-secondary bg-light">
            <div className="flex-grow-1 pe-2">
              <h2 className="modal-title h5 mb-0" id={titleId}>
                Sign in with mobile
              </h2>
              <p className="small text-muted mb-0 mt-1">
                Enter your number to receive an OTP. You can close this and keep
                browsing—we&apos;ll remind you every 2 minutes until you sign
                in.
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseModal}
            />
          </div>

          <div className="modal-body">
            {error ? (
              <div
                className="alert alert-warning border-0 mb-3 d-flex align-items-start gap-2"
                role="alert"
              >
                <i
                  className="fas fa-exclamation-triangle mt-1"
                  aria-hidden="true"
                />
                <span>{error}</span>
              </div>
            ) : null}

            <form onSubmit={handleRequestOtp} className="mb-4">
              <label htmlFor="shop-phone-otp-phone" className="form-label">
                Mobile number
              </label>
              <div className="input-group">
                <span className="input-group-text">+91</span>
                <input
                  id="shop-phone-otp-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  className="form-control"
                  placeholder="10-digit mobile number"
                  maxLength={14}
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  disabled={requestPending || verifyPending}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3 w-100"
                disabled={requestPending || verifyPending}
              >
                {requestPending ? "Sending OTP…" : "Send OTP"}
              </button>
            </form>

            {challengeId ? (
              <form onSubmit={handleVerifyOtp}>
                <label htmlFor="shop-phone-otp-code" className="form-label">
                  Enter OTP
                </label>
                <input
                  id="shop-phone-otp-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="form-control form-control-lg text-center"
                  style={{ letterSpacing: "0.35em" }}
                  placeholder="••••••"
                  maxLength={8}
                  value={otp}
                  onChange={(ev) => setOtp(ev.target.value)}
                  disabled={verifyPending}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-success mt-3 w-100"
                  disabled={verifyPending || requestPending}
                >
                  {verifyPending ? "Verifying…" : "Verify & continue"}
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
