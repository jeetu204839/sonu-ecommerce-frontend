import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service temporarily unavailable | Ray Enterprises",
  robots: { index: false, follow: false },
};

export default function ServiceUnavailablePage() {
  return (
    <div className="container-fluid page-header py-5 py-lg-6">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7 text-center text-white">
            <p className="text-uppercase small text-white-50 mb-2 letter-spacing-wide">
              System notice
            </p>
            <h1 className="display-5 fw-bold mb-3 text-white">
              We can&apos;t reach our catalogue right now
            </h1>
            <p className="lead text-white-50 mb-4">
              Our product service is not responding. This is usually temporary
              while maintenance runs or the connection is restored. Please try
              again in a few minutes.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link
                href="/"
                className="btn btn-light btn-lg rounded-pill px-5 fw-semibold"
              >
                Try again
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline-light btn-lg rounded-pill px-5 fw-semibold"
              >
                Contact us
              </Link>
            </div>
            <p className="small text-white-50 mt-5 mb-0">
              If this continues, please contact support with the time you saw
              this message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
