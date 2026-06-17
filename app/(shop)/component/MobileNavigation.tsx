import Link from "next/link";
import { cookies } from "next/headers";

import ShopSignInTrigger from "@/app/(shop)/component/ShopSignInTrigger";
import { shopLogoutAction } from "@/app/(shop)/user/actions";
import { SHOP_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";

const drawerLinkClass = "nav-link shop-drawer-link py-3 px-3 rounded";

export default async function MobileNavigation() {
  const isLoggedIn = Boolean(
    (await cookies()).get(SHOP_AUTH_TOKEN_COOKIE)?.value?.trim(),
  );

  return (
    <div
      className="offcanvas offcanvas-start shop-nav-drawer"
      tabIndex={-1}
      id="shopNavDrawer"
      aria-labelledby="shopNavDrawerLabel"
    >
      <div className="offcanvas-header border-bottom py-3 d-flex align-items-center justify-content-between gap-2">
        <Link
          id="shopNavDrawerLabel"
          href="/"
          className="d-flex align-items-center gap-2 gap-sm-3 text-decoration-none text-reset flex-grow-1 min-w-0 me-1"
          data-bs-dismiss="offcanvas"
        >
          <img
            src="/img/logo.png"
            className="img-fluid rounded-top flex-shrink-0"
            alt="Brand logo"
            style={{ maxHeight: "48px", width: "auto" }}
          />
          <span
            className="brand-enterprises fw-bold mb-0 lh-sm"
            style={{ fontSize: "clamp(0.85rem, 3.5vw, 1.25rem)" }}
          >
            Irozen
          </span>
        </Link>
        <button
          type="button"
          className="btn-close flex-shrink-0"
          data-bs-dismiss="offcanvas"
          aria-label="Close menu"
        />
      </div>
      <div className="offcanvas-body">
        <nav
          className="nav flex-column px-2 pt-2 shop-nav-drawer-nav"
          aria-label="Mobile menu"
        >
          <Link
            href="/"
            className={drawerLinkClass}
            data-bs-dismiss="offcanvas"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={drawerLinkClass}
            data-bs-dismiss="offcanvas"
          >
            Shop
          </Link>
          <Link
            href="/search"
            className={drawerLinkClass}
            data-bs-dismiss="offcanvas"
          >
            Search
          </Link>
          <Link
            href="/contact"
            className={drawerLinkClass}
            data-bs-dismiss="offcanvas"
          >
            Contact
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/user"
                className={drawerLinkClass}
                data-bs-dismiss="offcanvas"
              >
                Profile
              </Link>
              <form action={shopLogoutAction} className="px-2">
                <button
                  type="submit"
                  className={`${drawerLinkClass} w-100 text-start border-0 bg-transparent`}
                  data-bs-dismiss="offcanvas"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <ShopSignInTrigger variant="drawer" />
          )}
        </nav>
        <div className="shop-nav-drawer-footer">
          <Link
            href="/contact"
            className="shop-mega-cta shop-nav-drawer-cta"
            data-bs-dismiss="offcanvas"
          >
            Get Best Price
          </Link>
        </div>
      </div>
    </div>
  );
}
