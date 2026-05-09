import Link from "next/link";

import MobileNavigation from "@/app/(shop)/component/MobileNavigation";
import NavSearchForm from "@/app/(shop)/component/NavSearchForm";

function NavUtilLink({
  href,
  iconClass,
  label,
}: Readonly<{
  href: string;
  iconClass: string;
  label: string;
}>) {
  return (
    <Link
      href={href}
      className="shop-nav-util text-decoration-none text-white text-center"
    >
      <i className={`${iconClass} shop-nav-util-icon d-block mx-auto`} aria-hidden="true" />
      <span className="shop-nav-util-label">{label}</span>
    </Link>
  );
}

const Navigation = () => {
  return (
    <header className="fixed-top site-navbar-bar shop-mega-nav w-100">
      <div className="container-fluid px-2 px-sm-3 px-lg-4">
        <div className="d-flex align-items-center justify-content-between gap-2 py-2">
          <Link
            href="/"
            className="shop-mega-brand d-flex align-items-center gap-2 gap-sm-3 text-decoration-none flex-shrink-0"
          >
            <img
              src="/img/logo.webp"
              className="shop-mega-logo img-fluid"
              alt="Brand logo"
              width={44}
              height={44}
            />
            <span className="shop-mega-wordmark fw-bold mb-0 lh-sm d-none d-sm-inline">
              Enterprises
            </span>
          </Link>

          <div className="d-flex d-lg-none align-items-center gap-1 flex-shrink-0">
            <button
              type="button"
              className="shop-nav-toggler shop-nav-toggler--on-dark py-2 px-3"
              data-bs-toggle="offcanvas"
              data-bs-target="#shopNavDrawer"
              aria-controls="shopNavDrawer"
              aria-label="Open menu"
            >
              <span className="fa fa-bars text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="d-none d-lg-flex align-items-center flex-grow-1 justify-content-center gap-2 gap-xl-3 min-w-0 ms-2">
            <NavSearchForm className="flex-grow-1 shop-nav-search-max" />
            <Link href="/contact" className="shop-mega-cta flex-shrink-0">
              Get Best Price
            </Link>
            <nav
              className="d-none d-xl-flex align-items-center flex-shrink-0 gap-2 gap-xxl-3"
              aria-label="Quick links"
            >
              <NavUtilLink href="/shop" iconClass="fas fa-store-alt" label="Shop" />
              <NavUtilLink href="/contact" iconClass="fas fa-question-circle" label="Contact" />
              <div className="dropdown">
                <button
                  type="button"
                  className="shop-nav-signin btn btn-link text-white text-decoration-none p-0 border-0 shadow-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Sign in menu"
                >
                  <i className="fas fa-user d-block mx-auto shop-nav-util-icon" aria-hidden="true" />
                  <span className="shop-nav-util-label">Sign In</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 py-2 small">
                  <li>
                    <Link href="/contact" className="dropdown-item">
                      Continue as guest
                    </Link>
                  </li>
                  <li>
                    <span className="dropdown-item-text text-muted">
                      Account login can be added here.
                    </span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="d-lg-none pb-2">
          <NavSearchForm compact />
        </div>
      </div>

      <MobileNavigation />
    </header>
  );
};

export default Navigation;
