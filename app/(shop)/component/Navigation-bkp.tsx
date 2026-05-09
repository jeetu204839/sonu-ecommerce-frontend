import Link from 'next/link';

const Navigation = () => {

  return (
    <>
      <header className="fixed-top site-navbar-bar w-100 bg-white">
          <nav className="navbar navbar-light bg-white navbar-expand-xl w-100 px-3 px-sm-4 px-lg-5">
            <a
              href="/"
              className="navbar-brand d-flex align-items-center gap-2 gap-sm-3 text-decoration-none"
            >
              <img
                src="/img/logo.webp"
                className="img-fluid rounded-top"
                alt="Brand logo"
                style={{ maxHeight: "56px", width: "auto" }}
              />
              <span
                className="brand-enterprises fw-bold mb-0 lh-sm"
                style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.45rem)" }}
              >
                Enterprises
              </span>
            </a>
            <button
              className="navbar-toggler shop-nav-toggler py-2 px-3 d-xl-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#shopNavDrawer"
              aria-controls="shopNavDrawer"
              aria-label="Open menu"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>

            <div className="d-none d-xl-flex flex-grow-1 align-items-center bg-white ms-2">
              <div className="navbar-nav mx-auto">
                <Link href="/" className="nav-item nav-link active">Home</Link>

                <Link href="/shop" className="nav-item nav-link"> Shop </Link>
                <Link href="/search" className="nav-item nav-link">Search </Link>

                {/* <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"  >   Pages </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <a href="/cart" className="dropdown-item">
                      Cart
                    </a>
                    <a href="/checkout" className="dropdown-item">
                      Checkout
                    </a>
                    <a href="/testimonial" className="dropdown-item">
                      Testimonial
                    </a>
                    <a href="/404" className="dropdown-item">
                      404 Page
                    </a>
                  </div>
                </div> */}

                <Link href="/contact" className="nav-item nav-link">Contact</Link>
              </div>
              <div className="d-flex m-3 me-0">
                <a href="#" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{
                      top: "-5px",
                      left: "15px",
                      height: "20px",
                      minWidth: "20px",
                    }}
                  >
                    3
                  </span>
                </a>
                <a href="#" className="my-auto">
                  <i className="fas fa-user fa-2x"></i>
                </a>
              </div>
            </div>
          </nav>

          <div
            className="offcanvas offcanvas-start shop-nav-drawer"
            tabIndex={-1}
            id="shopNavDrawer"
            aria-labelledby="shopNavDrawerLabel"
          >
            <div className="offcanvas-header border-bottom py-3 d-flex align-items-center justify-content-between gap-2">
              <a
                id="shopNavDrawerLabel"
                href="/"
                className="d-flex align-items-center gap-2 gap-sm-3 text-decoration-none text-reset flex-grow-1 min-w-0 me-1"
                data-bs-dismiss="offcanvas"
              >
                <img
                  src="/img/logo.webp"
                  className="img-fluid rounded-top flex-shrink-0"
                  alt="Brand logo"
                  style={{ maxHeight: "48px", width: "auto" }}
                />
                <span
                  className="brand-enterprises fw-bold mb-0 lh-sm"
                  style={{ fontSize: "clamp(0.85rem, 3.5vw, 1.25rem)" }}
                >
                  Enterprises
                </span>
              </a>
              <button
                type="button"
                className="btn-close flex-shrink-0"
                data-bs-dismiss="offcanvas"
                aria-label="Close menu"
              ></button>
            </div>
            <div className="offcanvas-body d-flex flex-column p-0">
              <nav className="nav flex-column px-2 pt-2">
                <a
                  className="nav-link shop-drawer-link py-3 px-3 rounded active"
                  href="/"
                  data-bs-dismiss="offcanvas"
                >
                  Home
                </a>
                <a
                  className="nav-link shop-drawer-link py-3 px-3 rounded"
                  href="/shop"
                  data-bs-dismiss="offcanvas"
                >
                  Shop
                </a>
                <a
                  className="nav-link shop-drawer-link py-3 px-3 rounded"
                  href="/shop-detail"
                  data-bs-dismiss="offcanvas"
                >
                  Shop Detail
                </a>
                <div className="px-3 py-2">
                  <div className="small text-muted text-uppercase fw-semibold mb-2">
                    Pages
                  </div>
                  <a
                    className="d-block py-2 text-decoration-none text-dark"
                    href="/cart"
                    data-bs-dismiss="offcanvas"
                  >
                    Cart
                  </a>
                  <a
                    className="d-block py-2 text-decoration-none text-dark"
                    href="/checkout"
                    data-bs-dismiss="offcanvas"
                  >
                    Checkout
                  </a>
                  <a
                    className="d-block py-2 text-decoration-none text-dark"
                    href="/testimonial"
                    data-bs-dismiss="offcanvas"
                  >
                    Testimonial
                  </a>
                  <a
                    className="d-block py-2 text-decoration-none text-dark"
                    href="/404"
                    data-bs-dismiss="offcanvas"
                  >
                    404 Page
                  </a>
                </div>
                <a
                  className="nav-link shop-drawer-link py-3 px-3 rounded"
                  href="/contact"
                  data-bs-dismiss="offcanvas"
                >
                  Contact
                </a>
              </nav>
              <div className="mt-auto border-top p-3 d-flex align-items-center justify-content-around gap-2 bg-light">
                <a
                  href="#"
                  className="position-relative text-primary d-inline-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1 small"
                    style={{
                      top: "0",
                      right: "0",
                      height: "20px",
                      minWidth: "20px",
                    }}
                  >
                    3
                  </span>
                </a>
                <a
                  href="#"
                  className="text-primary d-inline-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="fas fa-user fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
      </header>
    </>
  );
};

export default Navigation;