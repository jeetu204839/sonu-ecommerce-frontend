/**
 * Admin authentication — not used by the shop storefront.
 * HttpOnly cookie set after successful POST /auth/login.
 */
export const ADMIN_AUTH_TOKEN_COOKIE = "admin_auth_token";

/**
 * Shop storefront session after POST /auth/phone/verify-otp (distinct from admin).
 */
export const SHOP_AUTH_TOKEN_COOKIE = "shop_auth_token";

/** Dispatched in the browser after phone OTP verify saves the session cookie. */
export const SHOP_AUTH_READY_EVENT = "shop-auth-ready";

/** Opens the shop phone OTP sign-in modal (e.g. from nav “Sign in” link). */
export const SHOP_PHONE_OTP_OPEN_EVENT = "shop-phone-otp-open";
