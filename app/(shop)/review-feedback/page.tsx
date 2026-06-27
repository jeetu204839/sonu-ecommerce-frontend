import Link from "next/link";
import type { Metadata } from "next";

import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_WEBSITE,
  CONTACT_WHATSAPP,
} from "@/app/(shop)/contact/contact-data";
import { absoluteUrl, resolveSiteUrl } from "@/app/(shop)/lib/seo/site-url";

import { submitReviewFeedbackForm } from "./actions";
import {
  REVIEW_FEEDBACK_BENEFITS,
  REVIEW_FEEDBACK_FAQ,
  REVIEW_FEEDBACK_INTRO,
  REVIEW_RATING_OPTIONS,
  REVIEW_TOPICS,
} from "./review-feedback-data";

type PageProps = {
  searchParams: Promise<{ thanks?: string; error?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await resolveSiteUrl();

  return {
    title: "Customer Reviews & Feedback | Irozen",
    description:
      "Share your valuable feedback and product review with IROZEN. We appreciate genuine customer experiences to improve our hardware, agricultural, industrial, and infrastructure products.",
    keywords: [
      "IROZEN Reviews",
      "Customer Feedback",
      "CI Hand Pump Reviews",
      "Agricultural Products Reviews",
      "Industrial Hardware Manufacturer India",
      "Hardware Manufacturer Reviews",
      "Customer Experience",
    ],
    alternates: {
      canonical: absoluteUrl("/review-feedback", siteUrl),
    },
  };
}

function BenefitList({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <ul className="list-unstyled mb-0">
      {items.map((item) => (
        <li
          key={item}
          className="d-flex align-items-center gap-2 mb-3 p-3 border border-secondary rounded bg-white"
        >
          <i
            className="fas fa-check-circle text-primary flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-secondary">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ReviewFeedbackPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const showThanks = sp.thanks === "1";
  const showError = sp.error === "1";

  return (
    <>
      <div className="container-fluid page-header py-4 py-lg-5">
        <div className="container text-center text-white">
          <h1 className="display-5 fw-bold mb-3 text-white">
            Customer Reviews &amp; Feedback
          </h1>
          <p className="lead mb-4 mx-auto text-white-50" style={{ maxWidth: "42rem" }}>
            Your feedback helps IROZEN improve product quality, customer service,
            and overall buying experience.
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
                Reviews &amp; Feedback
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {showThanks ? (
        <div className="container py-3">
          <div
            className="alert alert-success border-0 shadow-sm mb-0"
            role="status"
          >
            <i className="fas fa-check-circle me-2" aria-hidden="true" />
            Thank you — your feedback has been received. Our team will review it
            shortly.
          </div>
        </div>
      ) : null}

      {showError ? (
        <div className="container py-3">
          <div className="alert alert-warning border-0 shadow-sm mb-0" role="alert">
            <i className="fas fa-exclamation-triangle me-2" aria-hidden="true" />
            Please fill in your full name, product name, rating, and feedback
            before submitting.
          </div>
        </div>
      ) : null}

      <div className="container py-5">
        <div className="row g-4 g-lg-5 align-items-start mb-5">
          <div className="col-lg-6">
            <section aria-labelledby="why-feedback-heading">
              <h2 id="why-feedback-heading" className="h3 text-primary mb-4">
                Why Your Feedback Matters
              </h2>
              <p className="text-secondary mb-4">{REVIEW_FEEDBACK_INTRO}</p>
              <BenefitList items={REVIEW_FEEDBACK_BENEFITS} />
            </section>
          </div>

          <div className="col-lg-6">
            <section
              className="p-4 p-lg-5 bg-light border border-secondary rounded shadow-sm h-100"
              aria-labelledby="feedback-form-heading"
            >
              <h2 id="feedback-form-heading" className="h3 text-primary mb-4">
                Submit Your Feedback
              </h2>

              <form action={submitReviewFeedbackForm} noValidate>
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
                  <div className="col-12">
                    <label htmlFor="review-name" className="form-label fw-semibold">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="review-name"
                      name="name"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="Your full name"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="review-company" className="form-label fw-semibold">
                      Company Name
                    </label>
                    <input
                      id="review-company"
                      name="company"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="Company name (optional)"
                      autoComplete="organization"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="review-city" className="form-label fw-semibold">
                      City &amp; State
                    </label>
                    <input
                      id="review-city"
                      name="city_state"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="City and state"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="review-product" className="form-label fw-semibold">
                      Product Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="review-product"
                      name="product_name"
                      type="text"
                      className="form-control border-secondary"
                      placeholder="Product you purchased or used"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="review-rating" className="form-label fw-semibold">
                      Rating <span className="text-danger">*</span>
                    </label>
                    <select
                      id="review-rating"
                      name="rating"
                      className="form-select border-secondary"
                      defaultValue="5"
                      required
                    >
                      {REVIEW_RATING_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="review-feedback" className="form-label fw-semibold">
                      Your Feedback <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="review-feedback"
                      name="feedback"
                      rows={6}
                      className="form-control border-secondary"
                      placeholder="Write your feedback..."
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>

        <section className="mb-5" aria-labelledby="review-topics-heading">
          <h2 id="review-topics-heading" className="h3 text-primary text-center mb-4">
            What Can You Review?
          </h2>
          <div className="row g-3 g-md-4">
            {REVIEW_TOPICS.map((topic) => (
              <div key={topic} className="col-md-6 col-lg-4">
                <div className="card border-secondary shadow-sm h-100 text-center">
                  <div className="card-body p-4">
                    <h3 className="h6 fw-semibold mb-0">{topic}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5" aria-labelledby="review-faq-heading">
          <h2 id="review-faq-heading" className="h3 text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <div className="accordion" id="reviewFeedbackFaq">
            {REVIEW_FEEDBACK_FAQ.map((item, index) => {
              const headingId = `review-faq-heading-${index}`;
              const panelId = `review-faq-panel-${index}`;
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
                    data-bs-parent="#reviewFeedbackFaq"
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

        <section
          className="rounded p-4 p-lg-5 text-center bg-light border border-secondary mb-5"
          aria-labelledby="review-policy-heading"
        >
          <h2 id="review-policy-heading" className="h3 text-primary mb-3">
            Review Guidelines
          </h2>
          <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "36rem" }}>
            Please read our Review &amp; Comments Policy before submitting your review.
          </p>
          <Link
            href="/review-comments-policy"
            className="btn btn-primary rounded-pill px-4 fw-semibold"
          >
            View Review Policy
          </Link>
        </section>

        <section
          className="rounded p-4 p-lg-5 text-center text-white"
          style={{ backgroundColor: "var(--bs-primary, #0d6efd)" }}
          aria-labelledby="review-contact-heading"
        >
          <h2 id="review-contact-heading" className="h3 mb-3 text-white">
            Need Assistance?
          </h2>
          <p className="lead mb-4 mx-auto text-white-50" style={{ maxWidth: "42rem" }}>
            For manufacturing defects, product support, or order-related issues,
            please contact us directly.
          </p>
          <ul className="list-unstyled mb-4 text-white">
            <li className="mb-2">
              <i className="fab fa-whatsapp me-2" aria-hidden="true" />
              WhatsApp:{" "}
              <a
                href={CONTACT_WHATSAPP}
                className="text-white text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT_PHONE}
              </a>
            </li>
            <li className="mb-2">
              <i className="fas fa-globe me-2" aria-hidden="true" />
              <a
                href={CONTACT_WEBSITE}
                className="text-white text-decoration-none"
              >
                {CONTACT_WEBSITE.replace(/^https:\/\//, "")}
              </a>
            </li>
            <li>
              <i className="fas fa-envelope me-2" aria-hidden="true" />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-white text-decoration-none"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a
              href={CONTACT_WHATSAPP}
              className="btn btn-light rounded-pill px-4 fw-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="btn btn-outline-light rounded-pill px-4 fw-semibold"
            >
              Call {CONTACT_PHONE}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
