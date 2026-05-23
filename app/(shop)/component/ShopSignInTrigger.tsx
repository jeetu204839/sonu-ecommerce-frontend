"use client";

import { SHOP_PHONE_OTP_OPEN_EVENT } from "@/lib/auth/constants";

type ShopSignInTriggerProps = Readonly<{
  /** Nav icon button (logged out) or dropdown menu item (legacy). */
  variant?: "nav" | "dropdown";
  className?: string;
}>;

export default function ShopSignInTrigger({
  variant = "nav",
  className,
}: ShopSignInTriggerProps) {
  function handleClick() {
    window.dispatchEvent(new Event(SHOP_PHONE_OTP_OPEN_EVENT));
  }

  if (variant === "nav") {
    return (
      <button
        type="button"
        className={
          className ??
          "shop-nav-signin btn btn-link text-white text-decoration-none p-0 border-0 shadow-none"
        }
        aria-label="Sign in with your mobile number"
        onClick={handleClick}
      >
        <i
          className="fas fa-user d-block mx-auto shop-nav-util-icon"
          aria-hidden="true"
        />
        <span className="shop-nav-util-label">Sign In</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={className ?? "dropdown-item"}
      data-bs-dismiss="dropdown"
      onClick={handleClick}
    >
      Sign in with your mobile number
    </button>
  );
}
