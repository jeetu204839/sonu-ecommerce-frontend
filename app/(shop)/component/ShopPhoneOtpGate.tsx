"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { setShopAuthSessionAction } from "@/app/(shop)/shop-phone-auth-actions";
import {
  SHOP_AUTH_READY_EVENT,
  SHOP_PHONE_OTP_OPEN_EVENT,
} from "@/lib/auth/constants";
import {
  mergeShopProfileSnapshots,
  shopProfileFromUser,
} from "@/lib/auth/shop-profile-snapshot";
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

function maskIndianMobile(digits: string): string {
  if (digits.length < 10) return digits || "••••••••••";
  return `••••••${digits.slice(-4)}`;
}

export default function ShopPhoneOtpGate({
  initiallyLoggedIn,
}: ShopPhoneOtpGateProps) {
  const router = useRouter();
  const titleId = useId();
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

  function scheduleNextReminder() {
    clearReminderTimer();
    reminderTimerRef.current = window.setTimeout(() => {
      setModalOpen(true);
      reminderTimerRef.current = undefined;
    }, REMINDER_MS);
  }

  useEffect(() => {
    if (loggedIn) {
      clearReminderTimer();
      return;
    }
    scheduleNextReminder();
    return () => clearReminderTimer();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) return;

    function openSignInModal() {
      clearReminderTimer();
      setChallengeId(null);
      setOtp("");
      setError(null);
      setModalOpen(true);
    }

    window.addEventListener(SHOP_PHONE_OTP_OPEN_EVENT, openSignInModal);
    return () =>
      window.removeEventListener(SHOP_PHONE_OTP_OPEN_EVENT, openSignInModal);
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

      const profileSnapshot = mergeShopProfileSnapshots(
        shopProfileFromUser(env?.data?.user, phoneDigits),
        {
          name: "",
          email: "",
          phoneNumber: phoneDigits,
          countryCode: "91",
        },
      );

      const session = await setShopAuthSessionAction(token, profileSnapshot);
      if (!session.ok) {
        setError(session.message ?? "Could not save your session.");
        return;
      }

      window.dispatchEvent(new Event(SHOP_AUTH_READY_EVENT));

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

  function handleSkip() {
    setModalOpen(false);
    scheduleNextReminder();
  }

  function handleEditNumber() {
    setChallengeId(null);
    setOtp("");
    setError(null);
  }

  if (loggedIn) {
    return null;
  }

  if (!modalOpen) {
    return null;
  }

  const otpStep = Boolean(challengeId);

  return (
    <div
      className="shop-phone-otp-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="shop-phone-otp-card">
        <div className="shop-phone-otp-head">
          <h2 id={titleId}>
            {otpStep ? "Verify your mobile" : "Login to connect with suppliers"}
          </h2>
          <p className="shop-phone-otp-tagline">
            {otpStep ? (
              <>
                Enter the OTP sent to{" "}
                <span className="text-white text-nowrap">
                  +91 {maskIndianMobile(phoneDigits)}
                </span>
              </>
            ) : (
              <>Login to get verified sellers</>
            )}
          </p>
        </div>

        <div className="shop-phone-otp-body">
          {error ? (
            <div className="shop-phone-otp-alert" role="alert">
              {error}
            </div>
          ) : null}

          {otpStep ? (
            <form onSubmit={handleVerifyOtp}>
              <button
                type="button"
                className="shop-phone-otp-back-top"
                onClick={handleEditNumber}
              >
                ← Change number
              </button>

              <div className="shop-phone-otp-otp-label">Enter OTP</div>
              <label htmlFor="shop-phone-otp-code" className="visually-hidden">
                One-time password
              </label>
              <input
                id="shop-phone-otp-code"
                className="shop-phone-otp-otp-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="• • • • • •"
                maxLength={8}
                value={otp}
                onChange={(ev) => setOtp(ev.target.value)}
                disabled={verifyPending}
              />

              <button
                type="submit"
                className="shop-phone-otp-btn-continue"
                disabled={verifyPending || requestPending}
              >
                {verifyPending ? (
                  "Verifying…"
                ) : (
                  <>
                    Verify{" "}
                    <i className="fas fa-play" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequestOtp} noValidate>
              <label htmlFor="shop-phone-otp-phone" className="visually-hidden">
                Mobile number
              </label>
              <div className="shop-phone-otp-phone-row">
                <div className="shop-phone-otp-cc" aria-hidden="true">
                  <span className="shop-phone-otp-flag">🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  id="shop-phone-otp-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Enter your mobile number"
                  maxLength={14}
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  disabled={requestPending || verifyPending}
                />
              </div>

              <div className="shop-phone-otp-trust">
                <span className="shop-phone-otp-trust-icon" aria-hidden="true">
                  <i className="fas fa-check" />
                </span>
                <span>Your mobile number is safe with us</span>
              </div>

              <button
                type="submit"
                className="shop-phone-otp-btn-continue"
                disabled={requestPending || verifyPending}
              >
                {requestPending ? (
                  "Sending…"
                ) : (
                  <>
                    Continue{" "}
                    <i className="fas fa-play" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="shop-phone-otp-footer border-top border-secondary">
          <button type="button" className="shop-phone-otp-skip" onClick={handleSkip}>
            Skip
          </button>
          <Link href="/" className="shop-phone-otp-brand">
            <img src="/img/logo.webp" alt="" width={28} height={28} />
            <span className="shop-phone-otp-brand-text brand-enterprises">
              Enterprises
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
