const MobileNavigation = () => {
  return (
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
        />
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
            href="/cart"
            className="position-relative text-primary d-inline-flex align-items-center justify-content-center text-decoration-none"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="fa fa-shopping-bag fa-2x" />
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
            href="/contact"
            className="text-primary d-inline-flex align-items-center justify-content-center text-decoration-none"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="fas fa-user fa-2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
