import type { LegalDocument } from "@/app/(shop)/legal/legal-types";

export const refundReturnPolicyDocument: LegalDocument = {
  slug: "refund-return-policy",
  title: "Refund & Return Policy",
  description:
    "Read the official Return & Refund Policy of IROZEN for hardware, agricultural, industrial, and infrastructure products.",
  lastUpdated: "01 July 2026",
  sections: [
    {
      id: "overview",
      title: "1. Overview",
      paragraphs: [
        "Thank you for choosing IROZEN. We manufacture and supply high-quality hardware, agricultural, industrial, and infrastructure products across India.",
        "Please read this Return & Refund Policy carefully before placing your order. By purchasing from IROZEN, you agree to the terms mentioned below.",
      ],
    },
    {
      id: "non-returnable",
      title: "2. Non-Returnable Products",
      paragraphs: [
        "All products sold by IROZEN are NON-RETURNABLE and NON-REFUNDABLE.",
        "We do not accept returns simply because the buyer changes their mind, orders the wrong item, no longer needs the product, or places an incorrect quantity.",
      ],
    },
    {
      id: "manufacturing-defect",
      title: "3. Manufacturing Defect",
      paragraphs: [
        "Returns or replacement requests will only be considered if the product has a genuine manufacturing defect.",
      ],
      list: [
        "The issue must be reported within 48 hours of delivery.",
        "Buyer must provide clear photos and videos.",
        "Invoice or purchase proof is mandatory.",
        "After verification, IROZEN may offer a replacement, repair, or reasonable compensation at its sole discretion.",
      ],
    },
    {
      id: "transit-damage",
      title: "4. Transit Damage",
      paragraphs: [
        "Once the shipment has been handed over to the transport, courier, or logistics partner, the responsibility for safe transportation lies with the transport provider and the buyer.",
        "IROZEN shall not be responsible for any damage, breakage, loss, leakage, mishandling, or shortage occurring during transit.",
      ],
    },
    {
      id: "buyer-responsibilities",
      title: "5. Buyer Responsibilities",
      list: [
        "Inspect the shipment at the time of delivery.",
        "Report visible damage immediately to the transporter.",
        "Use proper storage and handling procedures.",
        "Verify product specifications before ordering.",
      ],
    },
    {
      id: "not-accepted",
      title: "6. Returns Will NOT Be Accepted For",
      list: [
        "Wrong product ordered by the buyer.",
        "Incorrect quantity ordered.",
        "Change of mind.",
        "Improper installation.",
        "Damage after delivery.",
        "Rust due to improper storage.",
        "Normal wear and tear.",
        "Physical damage caused by misuse.",
      ],
    },
    {
      id: "report-defect",
      title: "7. How to Report a Manufacturing Defect",
      paragraphs: ["Please provide the following:"],
      list: [
        "Order Number",
        "Product Name",
        "Photos of the defect",
        "Video of the issue",
        "Purchase Invoice",
      ],
    },
    {
      id: "contact",
      title: "8. Contact Us",
      paragraphs: [
        "IROZEN",
        "Website: https://irozen.in",
        "WhatsApp: +91 6202668606",
        "Email: sonuecom05@gmail.com",
      ],
    },
  ],
};
