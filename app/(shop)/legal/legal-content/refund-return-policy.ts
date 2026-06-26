import type { LegalDocument } from "@/app/(shop)/legal/legal-types";

export const refundReturnPolicyDocument: LegalDocument = {
  slug: "refund-return-policy",
  title: "Refund & Return Policy",
  description:
    "Irozen policy on returns, replacements, refunds, and quality claims for hardware and industrial product orders.",
  lastUpdated: "26 June 2026",
  sections: [
    {
      id: "overview",
      title: "1. Overview",
      paragraphs: [
        "Irozen supplies industrial hardware, agriculture tools, hand pumps, construction fittings, and engineering products primarily to businesses, contractors, distributors, and institutional buyers across India.",
        "Because many items are bulk, customised, or project-specific, our return and refund policy differs from standard retail e-commerce. This document explains when returns, replacements, or refunds may be considered and the process to follow.",
        "Please read this policy together with your confirmed quotation, invoice, and any product-specific warranty terms.",
      ],
    },
    {
      id: "general-principle",
      title: "2. General Principle",
      paragraphs: [
        "We stand behind the quality of products we manufacture or supply from approved sources. If you receive goods that are defective, damaged in transit, or materially different from the confirmed order, we will work with you in good faith to resolve the issue through repair, replacement, credit note, or refund as appropriate.",
        "Returns for change of mind, ordering errors by the customer, or incompatibility not verified before purchase are generally not accepted for industrial and bulk goods unless expressly agreed in writing at the time of order.",
      ],
    },
    {
      id: "eligible-cases",
      title: "3. When Returns or Refunds May Apply",
      list: [
        "Manufacturing defect confirmed upon inspection by our team or an authorised assessor.",
        "Transit damage where packaging is visibly compromised and noted on the proof of delivery (POD) at the time of receipt.",
        "Wrong SKU, specification, or quantity shipped compared with the confirmed invoice.",
        "Non-conformance with agreed material grade, dimensions, or finish where objectively verifiable.",
        "Products covered by an explicit written warranty or quality guarantee stated on the invoice.",
      ],
    },
    {
      id: "non-returnable",
      title: "4. Non-Returnable Items",
      list: [
        "Custom-made, fabricated, or OEM-branded products manufactured to your drawings or specifications.",
        "Cut-to-length, modified, or assembled items once production or alteration has commenced.",
        "Consumables, fasteners opened from bulk packs, or items with broken factory seals where hygiene or traceability is affected.",
        "Products damaged after delivery due to improper storage, handling, installation, or use.",
        "Clearance, discontinued, or specially discounted items marked “non-returnable” on the invoice.",
        "Goods returned without prior authorisation or outside the reporting window stated below.",
      ],
    },
    {
      id: "reporting-window",
      title: "5. Reporting Window",
      paragraphs: [
        "You must notify us of visible transit damage, shortage, or wrong delivery within 48 hours of receipt by emailing sonuecom05@gmail.com or calling +91 6202668606 with photos, invoice number, and delivery details.",
        "Latent manufacturing defects must be reported within 7 calendar days of delivery for standard catalogue items, or within the warranty period stated on your invoice for covered products.",
        "Failure to inspect goods upon delivery or to document damage on the transporter POD may limit our ability to assist with freight claims or replacements.",
      ],
    },
    {
      id: "return-process",
      title: "6. Return Authorisation Process",
      list: [
        "Contact our support team with your invoice number, product details, quantity affected, and supporting photographs or videos.",
        "Our quality team will review the claim and may request additional inspection, batch numbers, or sample return.",
        "If approved, we will issue a Return Material Authorisation (RMA) with instructions for packing, labelling, and dispatch.",
        "Unauthorized returns sent without RMA may be refused or returned to sender at the customer’s cost.",
        "Products must be returned in original packaging where possible, with all labels, tags, and accessories intact unless damage prevents safe repacking.",
      ],
    },
    {
      id: "inspection-resolution",
      title: "7. Inspection & Resolution",
      paragraphs: [
        "Returned goods are inspected upon receipt at our facility or designated location. Resolution timelines depend on product type, inspection requirements, and availability of replacement stock.",
        "Where a claim is approved, we may, at our discretion: dispatch a replacement at no additional product cost; issue a credit note for future purchases; arrange partial credit for acceptable minor variances; or process a refund to the original payment method for prepaid orders.",
        "Freight costs for approved warranty or error-related returns are typically borne by Irozen. Return shipping for customer-ordered errors or non-qualifying returns is borne by the customer unless otherwise agreed.",
      ],
    },
    {
      id: "refunds",
      title: "8. Refunds",
      paragraphs: [
        "Approved refunds are processed within 7–14 business days after inspection and confirmation, subject to banking and payment gateway processing times.",
        "Refunds are made to the original payment source where applicable. For bank transfer or credit orders, refunds may be issued via NEFT/RTGS or adjusted against outstanding balances by mutual agreement.",
        "GST credit notes will be issued in compliance with applicable tax regulations where a tax invoice was originally provided.",
      ],
    },
    {
      id: "cancellations",
      title: "9. Order Cancellations",
      paragraphs: [
        "Orders may be cancelled without penalty before production, procurement, or dispatch commences. Once materials are allocated, fabrication started, or goods dispatched, cancellation may incur restocking, handling, or freight charges as stated on your confirmation.",
        "To request cancellation, contact us immediately with your order reference. We will confirm whether cancellation is still possible and any applicable charges.",
      ],
    },
    {
      id: "contact",
      title: "10. Contact for Returns & Refunds",
      paragraphs: [
        "Email: sonuecom05@gmail.com | Phone / WhatsApp: +91 6202668606 | Address: 142/143/7, M.S.P.C Lane, Tikiapara Station, Howrah – 711101, West Bengal, India.",
        "Please include your company name, contact person, invoice number, and a clear description of the issue. Our team aims to acknowledge return requests within one business day.",
      ],
    },
  ],
};
