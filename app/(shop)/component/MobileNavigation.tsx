import Image from "next/image";
import { cookies } from "next/headers";

import ShopDrawerLink from "@/app/(shop)/component/ShopDrawerLink";
import ShopDrawerLogoutButton from "@/app/(shop)/component/ShopDrawerLogoutButton";
import ShopSignInTrigger from "@/app/(shop)/component/ShopSignInTrigger";
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
        <ShopDrawerLink
          id="shopNavDrawerLabel"
          href="/"
          className="d-flex align-items-center gap-2 gap-sm-3 text-decoration-none text-reset flex-grow-1 min-w-0 me-1"
        >
          <Image
            src="/img/logo.png"
            alt="Brand logo"
            width={120}
            height={48}
            className="rounded-top flex-shrink-0"
            style={{ height: "48px", width: "auto" }}
          />
          <span
            className="brand-enterprises fw-bold mb-0 lh-sm"
            style={{ fontSize: "clamp(0.85rem, 3.5vw, 1.25rem)" }}
          >
            Irozen
          </span>
        </ShopDrawerLink>
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
          <ShopDrawerLink href="/" className={drawerLinkClass}>
            Home
          </ShopDrawerLink>
          <ShopDrawerLink href="/shop" className={drawerLinkClass}>
            Shop
          </ShopDrawerLink>
          <ShopDrawerLink href="/search" className={drawerLinkClass}>
            Search
          </ShopDrawerLink>
          <ShopDrawerLink href="/contact" className={drawerLinkClass}>
            Contact
          </ShopDrawerLink>
          {isLoggedIn ? (
            <>
              <ShopDrawerLink href="/user" className={drawerLinkClass}>
                Profile
              </ShopDrawerLink>
              <ShopDrawerLogoutButton
                className={`${drawerLinkClass} w-100 text-start border-0 bg-transparent`}
              />
            </>
          ) : (
            <ShopSignInTrigger variant="drawer" />
          )}
        </nav>
        <div className="shop-nav-drawer-footer">
          <ShopDrawerLink
            href="/contact"
            className="shop-mega-cta shop-nav-drawer-cta"
          >
            Get Best Price
          </ShopDrawerLink>
        </div>
      </div>
    </div>
  );
}
