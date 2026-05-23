import Link from "next/link";
import { cookies } from "next/headers";

import ShopSignInTrigger from "@/app/(shop)/component/ShopSignInTrigger";
import { shopLogoutAction } from "@/app/(shop)/user/actions";
import { SHOP_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";

export default async function ShopNavAccountMenu() {
  const isLoggedIn = Boolean(
    (await cookies()).get(SHOP_AUTH_TOKEN_COOKIE)?.value?.trim(),
  );

  if (!isLoggedIn) {
    return <ShopSignInTrigger variant="nav" />;
  }

  return (
    <div className="dropdown">
      <button
        type="button"
        className="shop-nav-signin btn btn-link text-white text-decoration-none p-0 border-0 shadow-none dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-label="Account menu"
      >
        <i
          className="fas fa-user d-block mx-auto shop-nav-util-icon"
          aria-hidden="true"
        />
        <span className="shop-nav-util-label">Account</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 py-2 small">
        <li>
          <Link href="/user" className="dropdown-item">
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider my-1" />
        </li>
        <li>
          <form action={shopLogoutAction}>
            <button type="submit" className="dropdown-item">
              Logout
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
}
