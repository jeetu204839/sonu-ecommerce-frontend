"use client";

import { useEffect, useId, useState } from "react";
import { useFormStatus } from "react-dom";

import { submitProductEnquiry } from "./actions";

type ProductEnquiryModalProps = Readonly<{
  productSlug: string;
  productName: string;
  productSku: string;
}>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary px-4"
      disabled={pending}
    >
      {pending ? "Sending…" : "Submit enquiry"}
    </button>
  );
}

export default function ProductEnquiryModal({
  productSlug,
  productName,
  productSku,
}: ProductEnquiryModalProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gutter > 0) {
      body.style.paddingRight = `${gutter}px`;
    }
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2 px-4 px-xl-5 py-3 rounded-pill fw-semibold shadow"
        style={{ letterSpacing: "0.03em" }}
        onClick={() => setOpen(true)}
      >
        <i className="fas fa-envelope-open-text" aria-hidden="true" />
        Send enquiry
      </button>

      {open ? (
        <>
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content border-secondary shadow">
                <div className="modal-header border-secondary">
                  <div>
                    <h2 className="modal-title h5 mb-0" id={titleId}>
                      Send enquiry
                    </h2>
                    <p className="small text-muted mb-0 mt-1">
                      {productName}{" "}
                      <span className="text-secondary">· SKU {productSku}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <form action={submitProductEnquiry}>
                  <input type="hidden" name="productSlug" value={productSlug} />
                  <input type="hidden" name="productName" value={productName} />
                  <input type="hidden" name="productSku" value={productSku} />

                  <div
                    className="position-absolute opacity-0 overflow-hidden"
                    style={{ width: 0, height: 0 }}
                    aria-hidden="true"
                  >
                    <label htmlFor="enquiry-company-url">Company URL</label>
                    <input
                      id="enquiry-company-url"
                      type="text"
                      name="company_url"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="enquiry-name" className="form-label fw-semibold small">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        id="enquiry-name"
                        name="name"
                        type="text"
                        className="form-control border-secondary"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="enquiry-email" className="form-label fw-semibold small">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        id="enquiry-email"
                        name="email"
                        type="email"
                        className="form-control border-secondary"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="enquiry-phone" className="form-label fw-semibold small">
                        Contact number <span className="text-danger">*</span>
                      </label>
                      <input
                        id="enquiry-phone"
                        name="phone"
                        type="tel"
                        className="form-control border-secondary"
                        required
                        autoComplete="tel"
                        placeholder="Mobile or WhatsApp"
                      />
                    </div>
                    <div className="mb-0">
                      <label
                        htmlFor="enquiry-description"
                        className="form-label fw-semibold small"
                      >
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="enquiry-description"
                        name="description"
                        className="form-control border-secondary"
                        rows={4}
                        required
                        placeholder="Quantity, delivery location, timeline, or other requirements"
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-secondary bg-light">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <SubmitButton />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            role="presentation"
            onClick={() => setOpen(false)}
          />
        </>
      ) : null}
    </>
  );
}
