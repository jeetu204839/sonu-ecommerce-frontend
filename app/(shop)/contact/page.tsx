import Link from "next/link";
import type { Metadata } from "next";

import { submitContactForm } from "./actions";

export const metadata: Metadata = {
  title: "Contact Us | Ray Enterprises",
  description:
    "Reach Ray Enterprises for product enquiries, bulk orders, and support on premium cast iron and industrial hardware. Fast, professional responses for businesses and homeowners.",
};

type PageProps = {
  searchParams: Promise<{ thanks?: string; error?: string }>;
};

export default async function Contact({ searchParams }: PageProps) {
  const sp = await searchParams;
  const showThanks = sp.thanks === "1";
  const showError = sp.error === "1";

  return (
    <>
      {/* Page header — uses global .page-header (margin accounts for fixed nav) */}
      <div className="container-fluid page-header py-5">
        <div className="container text-center text-white">
          <h1 className="display-5 fw-bold mb-3" style={{color:'white'}}>Contact Us</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: "42rem" }}>
            Questions about cast iron hardware, hand pumps, valves, or a custom
            bulk order? Our team replies to every serious enquiry—usually within
            one business day.
          </p>
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link href="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-white-50"
                aria-current="page"
              >
                Contact
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {showThanks && (
        <div className="container py-3">
          <div
            className="alert alert-success border-0 shadow-sm mb-0"
            role="status"
          >
            <i className="fas fa-check-circle me-2" aria-hidden="true" />
            Thank you—your message has been received. We will get back to you
            shortly.
          </div>
        </div>
      )}

      {showError && (
        <div className="container py-3">
          <div className="alert alert-warning border-0 shadow-sm mb-0" role="alert">
            <i className="fas fa-exclamation-triangle me-2" aria-hidden="true" />
            Please fill in your name, email, and message so we can assist you.
          </div>
        </div>
      )}

      {/* Intro + trust strip */}
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <p className="text-secondary fs-5 mb-0">
              Ray Enterprises supplies durable, factory-tested cast iron and
              related industrial products to retailers, contractors, and
              end-customers across India. Use the form for quotations,
              technical questions, order status, or partnership enquiries—we
              route each request to the right specialist.
            </p>
          </div>
        </div>

        <div className="row g-4 g-lg-5 align-items-start">
          {/* Contact form */}
          <div className="col-lg-7">
            <div className="p-4 p-lg-5 bg-white border border-secondary rounded shadow-sm">
              <h2 className="h3 text-primary mb-4">Send us a message</h2>
              <p className="text-muted mb-4">
                Share a few details and we will respond with pricing,
                availability, or documentation as applicable. For urgent
                shipment issues, mention your order reference in the message.
              </p>

              <form action={submitContactForm} noValidate>
                {/* Honeypot — leave hidden; bots that fill it are ignored */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="position-absolute"
                  style={{
                    opacity: 0,
                    height: 0,
                    width: 0,
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                />

                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="contact-name" className="form-label fw-semibold">
                      Full name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="Your name"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contact-email" className="form-label fw-semibold">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="form-control border-secondary"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contact-phone" className="form-label fw-semibold">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="form-control border-secondary"
                      placeholder="+91 …"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contact-subject" className="form-label fw-semibold">
                      Topic
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      className="form-select border-secondary"
                      defaultValue="general"
                    >
                      <option value="general">General enquiry</option>
                      <option value="quote">Quote / bulk pricing</option>
                      <option value="product">Product specifications</option>
                      <option value="order">Order or delivery</option>
                      <option value="partnership">Dealer / partnership</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="contact-message" className="form-label fw-semibold">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-control border-secondary"
                      rows={6}
                      placeholder="Describe what you need—quantities, SKU names, delivery location, or timelines help us reply faster."
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 py-3 rounded-pill"
                    >
                      <i className="fas fa-paper-plane me-2" aria-hidden="true" />
                      Submit enquiry
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar: contact cards + hours */}
          <div className="col-lg-5">
            <div className="card border-secondary shadow-sm mb-4">
              <div className="card-body p-4">
                <h2 className="h5 text-primary mb-3">Office &amp; dispatch</h2>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex gap-3 mb-3">
                    <span
                      className="text-primary flex-shrink-0 mt-1"
                      aria-hidden="true"
                    >
                      <i className="fas fa-map-marker-alt fa-lg" />
                    </span>
                    <span className="text-secondary">
                      <strong className="text-dark d-block">Ray Enterprises</strong>
                      Industrial Area, Phase II
                      <br />
                      {/* Replace with your real address */}
                      Your City, State — PIN Code
                      <br />
                      India
                    </span>
                  </li>
                  <li className="d-flex gap-3 mb-3">
                    <span className="text-primary flex-shrink-0 mt-1" aria-hidden="true">
                      <i className="fas fa-phone-alt fa-lg" />
                    </span>
                    <span>
                      <a
                        href="tel:+911234567890"
                        className="text-decoration-none text-secondary"
                      >
                        +91 12345 67890
                      </a>
                      <span className="text-muted small d-block">
                        Mon–Sat, 9:00–18:00 IST
                      </span>
                    </span>
                  </li>
                  <li className="d-flex gap-3">
                    <span className="text-primary flex-shrink-0 mt-1" aria-hidden="true">
                      <i className="fas fa-envelope fa-lg" />
                    </span>
                    <span>
                      <a
                        href="mailto:sales@rayenterprises.example"
                        className="text-decoration-none text-secondary"
                      >
                        sales@rayenterprises.example
                      </a>
                      <span className="text-muted small d-block">
                        We never share your details with third parties.
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card border-0 bg-light mb-4">
              <div className="card-body p-4">
                <h2 className="h6 text-dark mb-3">
                  <i className="far fa-clock text-primary me-2" aria-hidden="true" />
                  Response times
                </h2>
                <p className="text-secondary small mb-2">
                  <strong className="text-dark">Sales &amp; quotes:</strong> same
                  day or next business day for most enquiries.
                </p>
                <p className="text-secondary small mb-2">
                  <strong className="text-dark">Technical support:</strong> 1–2
                  business days depending on complexity.
                </p>
                <p className="text-secondary small mb-0">
                  <strong className="text-dark">Holidays:</strong> responses may
                  be delayed during national holidays; we post notices on the
                  site when applicable.
                </p>
              </div>
            </div>

            <div className="border border-secondary rounded p-4 bg-white">
              <h2 className="h6 text-primary mb-3">Why buyers choose us</h2>
              <ul className="small text-secondary mb-0 ps-3">
                <li className="mb-2">
                  Consistent quality on cast iron and GI hardware suited for
                  agriculture, plumbing, and industrial use.
                </li>
                <li className="mb-2">
                  Transparent communication on lead times, packaging, and
                  freight—especially for bulk and repeat orders.
                </li>
                <li>
                  Long-term relationships with dealers and contractors who rely
                  on dependable supply and after-sales support.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
