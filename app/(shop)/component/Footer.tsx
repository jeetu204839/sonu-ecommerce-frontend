import Link from "next/link";

import { LEGAL_PAGE_LINKS } from "@/app/(shop)/legal/legal-types";

const Footer = () => {
  return (
    <div className="container-fluid py-4 footer-section">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-md-5">
            <Link href="/" className="footer-brand text-light text-decoration-none fw-bold">
              IROZEN
            </Link>
            <p className="text-light opacity-75 small mt-2 mb-0 pe-md-4">
              Trusted supplier of hardware, agriculture tools, hand pumps, and
              industrial equipment across India.
            </p>
          </div>

          <div className="col-md-4">
            <h2 className="h6 text-light mb-3">Policies</h2>
            <ul className="list-unstyled footer-policy-links mb-0">
              {LEGAL_PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-policy-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3">
            <h2 className="h6 text-light mb-3">Quick links</h2>
            <ul className="list-unstyled footer-policy-links mb-0">
              <li>
                <Link href="/shop" className="footer-policy-link">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-policy-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-4 pt-3 footer-bottom">
          <div className="col-12 text-center text-md-start">
            <span className="text-light opacity-75 small">
              <i className="fas fa-copyright text-light me-2" aria-hidden="true" />
              {new Date().getFullYear()} IROZEN. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
