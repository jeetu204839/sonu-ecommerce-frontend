import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP,
} from "@/app/(shop)/contact/contact-data";

export default function ProductDetailQuickContact() {
  return (
    <div className="product-detail-quick-contact">
      <p className="product-detail-quick-contact-title mb-0">
        <i className="fas fa-headset" aria-hidden="true" />{" "}
        Need instant help? Call or WhatsApp us
      </p>
      <div className="product-detail-quick-contact-buttons">
        <a
          href={`tel:${CONTACT_PHONE_TEL}`}
          className="btn product-detail-call-btn d-inline-flex align-items-center justify-content-center gap-2"
        >
          <i className="fas fa-phone-alt" aria-hidden="true" /> {CONTACT_PHONE}
        </a>
        <a
          href={CONTACT_WHATSAPP}
          className="btn product-detail-whatsapp-btn d-inline-flex align-items-center justify-content-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
