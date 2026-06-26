import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  buildWhatsAppUrl,
} from "@/app/(shop)/contact/contact-data";

type ProductDetailQuickContactProps = Readonly<{
  productName?: string;
  productSku?: string;
}>;

export default function ProductDetailQuickContact({
  productName,
  productSku,
}: ProductDetailQuickContactProps) {
  let whatsappMessage =
    "Hello Irozen, I have an enquiry. Please share details.";

  if (productName) {
    const skuPart = productSku ? ` (SKU: ${productSku})` : "";
    whatsappMessage = `Hello Irozen, I am interested in ${productName}${skuPart}. Please share price and availability.`;
  }

  const whatsappHref = buildWhatsAppUrl(whatsappMessage);

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
          href={whatsappHref}
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
