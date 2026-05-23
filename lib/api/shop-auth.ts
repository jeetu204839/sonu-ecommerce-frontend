import { postAuthLogout } from "@/lib/api/auth-logout";

/** @deprecated Use postAuthLogout — kept for shop imports. */
export async function shopAuthLogout(authToken: string): Promise<void> {
  return postAuthLogout(authToken);
}
