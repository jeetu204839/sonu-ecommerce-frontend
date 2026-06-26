import Link from "next/link";
import type { Metadata } from "next";

import { submitContactForm } from "./actions";
import {
  CONTACT_EMAIL,
  CONTACT_FAQ,
  CONTACT_INTRO,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_WEBSITE,
  CONTACT_WHATSAPP,
  ENQUIRY_FIELD_HINTS,
  INDUSTRIES_WE_SERVE,
  PRODUCTS_WE_SUPPLY,
  WHY_CHOOSE_IROZEN,
} from "./contact-data";

export const metadata: Metadata = {
  title:
    "Contact Irozen | Hardware, Agriculture Tools & Industrial Equipment Supplier in India",
  description:
    "Contact Irozen for wholesale hardware, agriculture tools, hand pumps, industrial equipment, OEM manufacturing, and bulk orders across India. Call, WhatsApp, or send an enquiry.",
};

type PageProps = {
  searchParams: Promise<{ thanks?: string; error?: string }>;
};

function CheckList({
  items,
  id,
}: Readonly<{ items: readonly string[]; id: string }>) {
  return (
    <ul className="list-unstyled mb-0" id={id}>
      {items.map((item) => (
        <li key={item} className="d-flex gap-2 mb-2 text-secondary">
          <i
            className="fas fa-check-circle text-primary mt-1 flex-shrink-0"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ContactPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const showThanks = sp.thanks === "1";
  const showError = sp.error === "1";

  return (
    <>
      {/* <div className="container-fluid page-header py-5">
        <div className="container text-center text-white">
          <h1 className="display-5 fw-bold mb-2 text-white">Contact Us</h1>
          <p className="h5 fw-normal mb-4 text-white-50">
            Get in Touch with Irozen
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
      </div> */}

      {showThanks ? (
        <div className="container py-3">
          <div
            className="alert alert-success border-0 shadow-sm mb-0"
            role="status"
          >
            <i className="fas fa-check-circle me-2" aria-hidden="true" />
            Thank you — your enquiry has been received. Our team will contact
            you shortly with pricing and complete product information.
          </div>
        </div>
      ) : null}

      {showError ? (
        <div className="container py-3">
          <div className="alert alert-warning border-0 shadow-sm mb-0" role="alert">
            <i className="fas fa-exclamation-triangle me-2" aria-hidden="true" />
            Please fill in your full name, email address, and message so we can
            assist you.
          </div>
        </div>
      ) : null}

      <div className="container py-5">
        {/* Intro */}
        <section className="row justify-content-center mb-5" aria-labelledby="contact-intro-heading">
          <div className="col-lg-10">
            <h2 id="contact-intro-heading" className="h4 text-primary mb-4">
              Get in Touch with Irozen
            </h2>
            {CONTACT_INTRO.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-secondary mb-3">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <div className="row g-4 g-lg-5 align-items-start mb-5">
          {/* Enquiry form */}
          <div className="col-lg-7">
            <section
              className="p-4 p-lg-5 bg-white border border-secondary rounded shadow-sm h-100"
              aria-labelledby="enquiry-form-heading"
            >
              <h2 id="enquiry-form-heading" className="h3 text-primary mb-3">
                Send Us Your Enquiry
              </h2>
              <p className="text-muted mb-2">
                Please provide the following information:
              </p>
              <p className="small text-secondary mb-4">
                {ENQUIRY_FIELD_HINTS.join(" · ")}
              </p>
              <p className="text-secondary mb-4">
                Our team will contact you shortly with pricing and complete
                product information.
              </p>

              <form action={submitContactForm} noValidate>
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
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="Your full name"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contact-company" className="form-label fw-semibold">
                      Company Name
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="Company or business name"
                      autoComplete="organization"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contact-phone" className="form-label fw-semibold">
                      Mobile Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="form-control border-secondary"
                      placeholder={CONTACT_PHONE}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contact-email" className="form-label fw-semibold">
                      Email Address <span className="text-danger">*</span>
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
                  <div className="col-md-4">
                    <label htmlFor="contact-city" className="form-label fw-semibold">
                      City
                    </label>
                    <input
                      id="contact-city"
                      name="city"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="City"
                      autoComplete="address-level2"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="contact-state" className="form-label fw-semibold">
                      State
                    </label>
                    <input
                      id="contact-state"
                      name="state"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="State"
                      autoComplete="address-level1"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="contact-country" className="form-label fw-semibold">
                      Country
                    </label>
                    <input
                      id="contact-country"
                      name="country"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="India"
                      defaultValue="India"
                      autoComplete="country-name"
                    />
                  </div>
                  <div className="col-md-8">
                    <label
                      htmlFor="contact-product"
                      className="form-label fw-semibold"
                    >
                      Product Requirement
                    </label>
                    <input
                      id="contact-product"
                      name="product_requirement"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="e.g. CI Hand Pumps, Agriculture Tools, Scaffolding Fittings"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="contact-quantity" className="form-label fw-semibold">
                      Quantity
                    </label>
                    <input
                      id="contact-quantity"
                      name="quantity"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="e.g. 100 units"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="contact-message" className="form-label fw-semibold">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-control border-secondary"
                      rows={5}
                      placeholder="Share your requirement, delivery location, timeline, or any technical details."
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
            </section>
          </div>

          {/* Company information + hours */}
          <div className="col-lg-5">
            <section
              className="card border-secondary shadow-sm mb-4"
              aria-labelledby="company-info-heading"
            >
              <div className="card-body p-4">
                <h2 id="company-info-heading" className="h4 text-primary mb-4">
                  Company Information
                </h2>

                <div className="mb-4">
                  <h3 className="h6 text-dark mb-2">Company Name</h3>
                  <p className="text-secondary mb-0 fw-semibold">Irozen</p>
                </div>

                <div className="mb-4">
                  <h3 className="h6 text-dark mb-2">Office Address</h3>
                  <address className="text-secondary mb-0">
                    <strong className="text-dark d-block">142/143/7, M.S.P.C Lane</strong>
                    Tikiapara Station
                    <br />
                    Howrah – 711101
                    <br />
                    West Bengal, India
                  </address>
                </div>

                <ul className="list-unstyled mb-0">
                  <li className="d-flex gap-3 mb-3">
                    <span className="text-primary flex-shrink-0 mt-1" aria-hidden="true">
                      <i className="fas fa-phone-alt fa-lg" />
                    </span>
                    <span>
                      <span className="d-block fw-semibold text-dark small">
                        Phone
                      </span>
                      <a
                        href={`tel:${CONTACT_PHONE_TEL}`}
                        className="text-decoration-none text-secondary"
                      >
                        {CONTACT_PHONE}
                      </a>
                    </span>
                  </li>
                  <li className="mb-3">
                    <a
                      href={CONTACT_WHATSAPP}
                      className="contact-whatsapp-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="contact-whatsapp-btn-icon" aria-hidden="true">
                        <i className="fab fa-whatsapp" />
                      </span>
                      <span className="contact-whatsapp-btn-text">
                        <span className="contact-whatsapp-btn-label">
                          WhatsApp Direct
                        </span>
                        <span className="contact-whatsapp-btn-hint">
                          Chat on WhatsApp · {CONTACT_PHONE}
                        </span>
                      </span>
                      <i
                        className="fas fa-chevron-right contact-whatsapp-btn-arrow"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  <li className="d-flex gap-3 mb-3">
                    <span className="text-primary flex-shrink-0 mt-1" aria-hidden="true">
                      <i className="fas fa-envelope fa-lg" />
                    </span>
                    <span>
                      <span className="d-block fw-semibold text-dark small">Email</span>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-decoration-none text-secondary"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </span>
                  </li>
                  <li className="d-flex gap-3">
                    <span className="text-primary flex-shrink-0 mt-1" aria-hidden="true">
                      <i className="fas fa-globe fa-lg" />
                    </span>
                    <span>
                      <span className="d-block fw-semibold text-dark small">Website</span>
                      <a
                        href={CONTACT_WEBSITE}
                        className="text-decoration-none text-secondary"
                      >
                        {CONTACT_WEBSITE.replace(/^https:\/\//, "")}
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section
              className="card border-0 bg-light"
              aria-labelledby="business-hours-heading"
            >
              <div className="card-body p-4">
                <h2 id="business-hours-heading" className="h5 text-primary mb-3">
                  <i className="far fa-clock me-2" aria-hidden="true" />
                  Business Hours
                </h2>
                <dl className="mb-0">
                  <dt className="text-dark fw-semibold">Monday – Saturday</dt>
                  <dd className="text-secondary mb-3">9:00 AM – 7:00 PM</dd>
                  <dt className="text-dark fw-semibold">Sunday</dt>
                  <dd className="text-secondary mb-0">Closed</dd>
                </dl>
              </div>
            </section>
          </div>
        </div>

        {/* Why choose + products + industries */}
        <div className="row g-4 g-lg-5 mb-5">
          <div className="col-lg-4">
            <section
              className="border border-secondary rounded p-4 bg-white h-100 shadow-sm"
              aria-labelledby="why-choose-heading"
            >
              <h2 id="why-choose-heading" className="h4 text-primary mb-4">
                Why Choose Irozen?
              </h2>
              <CheckList items={WHY_CHOOSE_IROZEN} id="why-choose-list" />
            </section>
          </div>
          <div className="col-lg-4">
            <section
              className="border border-secondary rounded p-4 bg-white h-100 shadow-sm"
              aria-labelledby="products-supply-heading"
            >
              <h2 id="products-supply-heading" className="h4 text-primary mb-4">
                Products We Supply
              </h2>
              <CheckList items={PRODUCTS_WE_SUPPLY} id="products-supply-list" />
            </section>
          </div>
          <div className="col-lg-4">
            <section
              className="border border-secondary rounded p-4 bg-white h-100 shadow-sm"
              aria-labelledby="industries-heading"
            >
              <h2 id="industries-heading" className="h4 text-primary mb-4">
                Industries We Serve
              </h2>
              <CheckList items={INDUSTRIES_WE_SERVE} id="industries-list" />
            </section>
          </div>
        </div>

        {/* FAQ */}
        <section className="mb-5" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="h3 text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <div className="accordion" id="contactFaq">
            {CONTACT_FAQ.map((item, index) => {
              const headingId = `faq-heading-${index}`;
              const panelId = `faq-panel-${index}`;
              const isFirst = index === 0;

              return (
                <div key={item.question} className="accordion-item border-secondary">
                  <h3 className="accordion-header" id={headingId}>
                    <button
                      className={`accordion-button ${isFirst ? "" : "collapsed"} fw-semibold`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${panelId}`}
                      aria-expanded={isFirst}
                      aria-controls={panelId}
                    >
                      {item.question}
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    className={`accordion-collapse collapse ${isFirst ? "show" : ""}`}
                    aria-labelledby={headingId}
                    data-bs-parent="#contactFaq"
                  >
                    <div className="accordion-body text-secondary">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact today CTA */}
        <section
          className="rounded p-4 p-lg-5 text-center text-white"
          style={{ backgroundColor: "var(--bs-primary, #0d6efd)" }}
          aria-labelledby="contact-today-heading"
        >
          <h2 id="contact-today-heading" className="h3 mb-3 text-white">
            Contact Today
          </h2>
          <p className="lead mb-4 mx-auto text-white-50" style={{ maxWidth: "48rem" }}>
            Looking for high-quality Hardware Items, Agriculture Tools, Industrial
            Equipment, Hand Pumps, or Construction Hardware?
          </p>
          <p className="h5 fw-semibold mb-4 text-white">
            Call or WhatsApp us today.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="btn btn-light btn-lg rounded-pill px-4 fw-semibold"
            >
              <i className="fas fa-phone-alt me-2" aria-hidden="true" />
              {CONTACT_PHONE}
            </a>
            <a
              href={CONTACT_WHATSAPP}
              className="btn contact-whatsapp-cta-btn btn-lg rounded-pill px-4 fw-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp me-2" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          <p className="mt-4 mb-0 text-white-50">
            We look forward to serving your business with reliable products and
            professional support.
          </p>
        </section>
      </div>
    </>
  );
}
