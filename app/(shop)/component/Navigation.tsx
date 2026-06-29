import Link from "next/link";
import Image from "next/image";

import MobileNavigation from "@/app/(shop)/component/MobileNavigation";
import NavSearchForm from "@/app/(shop)/component/NavSearchForm";
import ShopNavAccountMenu from "@/app/(shop)/component/ShopNavAccountMenu";
import ShopNavToggler from "@/app/(shop)/component/ShopNavToggler";

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
    <>
    <header className="fixed-top site-navbar-bar shop-mega-nav w-100">
      <div className="container-fluid px-2 px-sm-3 px-lg-4">
        <div className="d-flex align-items-center justify-content-between gap-2 py-2">
          <Link
            href="/"
            className="shop-mega-brand d-flex align-items-center gap-sm-3 text-decoration-none flex-shrink-0"
          >
            {/* <img
              src="/img/logo.png"
              className="shop-mega-logo img-fluid"
              alt="Brand logo"
              width={44}
              height={44}
            /> */}
            <Image
              src="/img/logo.png"
              alt="Irozen — home"
              width={44}
              height={44}
              className="shop-mega-logo"
              loading="eager"
              decoding="async"
            />
            <span className="shop-mega-wordmark fw-bold mb-0 lh-sm d-none d-sm-inline">
              Irozen
            </span>
          </Link>

          <div className="d-lg-none">
            <NavSearchForm compact />
          </div>

          <div className="d-flex d-lg-none align-items-center flex-shrink-0">
            <ShopNavToggler />
          </div>

          <div className="d-none d-lg-flex align-items-center flex-grow-1 justify-content-center gap-2 gap-xl-3 min-w-0 ms-2">
            <NavSearchForm className="flex-grow-1 shop-nav-search-max" />
            <Link href="/contact" className="shop-mega-cta flex-shrink-0">
              Get Best Price
            </Link>
            <nav
              className="d-none d-xl-flex align-items-center flex-shrink-0  gap-xxl-3"
              aria-label="Quick links"
            >
              <NavUtilLink href="/" iconClass="fas fa-home" label="Home" />
              <NavUtilLink href="/shop" iconClass="fas fa-store" label="Shop" />
              <NavUtilLink href="/contact" iconClass="fas fa-question-circle" label="Contact" />
              <ShopNavAccountMenu />
            </nav>
          </div>
        </div>

        {/* <div className="d-lg-none pb-2">
          <NavSearchForm compact />
        </div> */}

      </div>
    </header>
    <MobileNavigation />
    </>
  );
};

export default Navigation;
