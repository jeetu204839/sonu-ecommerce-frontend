import type { LegalDocument } from "@/app/(shop)/legal/legal-types";

export const shippingPolicyDocument: LegalDocument = {
  slug: "shipping-policy",
  title: "Shipping Policy",
  description:
    "How Irozen handles dispatch, freight, delivery timelines, and logistics for orders across India.",
  lastUpdated: "26 June 2026",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      paragraphs: [
        "This Shipping Policy describes how Irozen arranges dispatch and delivery of hardware, agriculture tools, hand pumps, industrial equipment, and related products sold to customers across India.",
        "Because our catalogue includes heavy, bulk, and project-based consignments, shipping methods, costs, and timelines vary by product weight, dimensions, destination PIN code, and order value. Final freight terms are confirmed in your quotation or tax invoice.",
      ],
    },
    {
      id: "service-area",
      title: "2. Service Area",
      paragraphs: [
        "We ship throughout India to business addresses, project sites, warehouses, and authorised delivery locations accessible by road transport. Deliveries to remote, high-altitude, or restricted areas may require additional time, surcharges, or alternative routing.",
        "Export shipments are handled on a case-by-case basis subject to documentation, compliance, and separate commercial terms.",
      ],
    },
    {
      id: "freight-calculation",
      title: "3. Freight Calculation",
      list: [
        "Freight is calculated based on chargeable weight (actual or volumetric, whichever is higher), destination PIN code, mode of transport, and packaging requirements.",
        "Light parcels may move via courier partners; heavy or palletised consignments typically move via surface transport or LTL (less-than-truckload) carriers.",
        "Fuel surcharges, tolls, appointment delivery, unloading assistance, or lift-gate services may apply where requested or required.",
        "Free or discounted shipping promotions, if offered, will be stated explicitly on the quotation or campaign terms.",
      ],
    },
    {
      id: "processing-time",
      title: "4. Order Processing & Dispatch Timelines",
      paragraphs: [
        "Dispatch timelines begin after order confirmation, receipt of agreed advance payment (if applicable), and verification of stock or production readiness.",
        "In-stock standard catalogue items are typically dispatched within 2–5 business days unless otherwise stated at enquiry stage.",
        "Made-to-order, imported, or bulk fabrication items require lead times communicated in the confirmed quotation—commonly ranging from 1–6 weeks depending on product complexity and raw material availability.",
        "During peak season, festivals, or force majeure events, dispatch may take longer. We will notify you proactively if delays are anticipated.",
      ],
    },
    {
      id: "packaging",
      title: "5. Packaging & Labelling",
      list: [
        "Products are packed to withstand normal road handling using cartons, gunny bags, strapping, bubble wrap, wooden crates, or pallets as appropriate.",
        "Fragile or precision items receive additional protective packaging at our discretion or per customer instruction where agreed in advance.",
        "Each consignment is labelled with invoice reference, item description, quantity, gross weight, and handling instructions where relevant.",
        "Special export or tender packaging requirements must be requested before dispatch and may affect cost and lead time.",
      ],
    },
    {
      id: "delivery",
      title: "6. Delivery & Proof of Delivery",
      paragraphs: [
        "Delivery is made to the ground-floor accessible point at the consignee address unless special arrangements are agreed. Upper-floor delivery, indoor placement, or installation are not included unless quoted separately.",
        "The recipient or authorised representative must inspect the shipment upon delivery. Visible carton damage, shortage, or tampering must be noted on the transporter’s proof of delivery (POD) before signing.",
        "Failure to note damage on the POD may limit our ability to file a carrier claim or approve a transit-related replacement.",
        "If delivery cannot be completed due to incorrect address, refusal, or inability to contact the consignee, redelivery or storage charges may apply.",
      ],
    },
    {
      id: "tracking",
      title: "7. Tracking & Communication",
      paragraphs: [
        "Where available, we share transporter name, LR/AWB number, and tracking details by email, SMS, or WhatsApp after dispatch.",
        "Tracking updates depend on third-party carrier systems and may not reflect real-time status for all surface routes. Our team can assist with manual status checks on request.",
      ],
    },
    {
      id: "risk-title",
      title: "8. Risk & Title",
      paragraphs: [
        "Unless otherwise stated on the invoice, risk in goods passes to the customer upon handover to the carrier at our dispatch location. Title passes upon full receipt of payment as per agreed commercial terms.",
        "Customers are advised to arrange transit insurance for high-value or project-critical consignments. Insurance can be quoted on request.",
      ],
    },
    {
      id: "special-handling",
      title: "9. Heavy & Project Shipments",
      list: [
        "Oversized or crane-unload items require the customer to confirm site access, unloading equipment, and safe storage at destination.",
        "Multi-truck or phased deliveries for large projects are coordinated with the customer’s site engineer or store manager.",
        "Demurrage, detention, or waiting charges arising from site delays may be billed to the customer per carrier tariff.",
        "Government, NGO, and tender deliveries may require additional documentation such as delivery challans, inspection certificates, or gate passes.",
      ],
    },
    {
      id: "contact",
      title: "10. Shipping Enquiries",
      paragraphs: [
        "For freight quotes before ordering, share product SKU, quantity, destination PIN code, and any site constraints via our contact form, email (sonuecom05@gmail.com), or phone (+91 6202668606).",
        "For post-dispatch support, reference your invoice number and LR/AWB details so we can assist quickly.",
      ],
    },
  ],
};
