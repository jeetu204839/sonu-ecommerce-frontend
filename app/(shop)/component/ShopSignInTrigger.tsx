"use client";

import { SHOP_PHONE_OTP_OPEN_EVENT } from "@/lib/auth/constants";

type ShopSignInTriggerProps = Readonly<{
  /** Nav icon (header), mobile drawer row, or dropdown menu item. */
  variant?: "nav" | "drawer" | "dropdown";
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

  if (variant === "drawer") {
    return (
      <button
        type="button"
        className={
          className ??
          "nav-link shop-drawer-link py-3 px-3 rounded w-100 text-start border-0 bg-transparent"
        }
        data-bs-dismiss="offcanvas"
        aria-label="Sign in with your mobile number"
        onClick={handleClick}
      >
        Sign In
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
