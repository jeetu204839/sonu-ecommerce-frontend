import type { LegalDocument } from "@/app/(shop)/legal/legal-types";

export const termsAndConditionsDocument: LegalDocument = {
  slug: "terms-and-conditions",
  title: "Terms & Conditions",
  description:
    "Terms governing use of the Irozen website, product listings, enquiries, quotations, and B2B supply arrangements.",
  lastUpdated: "26 June 2026",
  sections: [
    {
      id: "agreement",
      title: "1. Agreement to Terms",
      paragraphs: [
        "These Terms & Conditions (“Terms”) govern your access to and use of the Irozen website, product catalogue, enquiry forms, and related services operated by Irozen, with its registered office at 142/143/7, M.S.P.C Lane, Tikiapara Station, Howrah – 711101, West Bengal, India.",
        "By accessing our website, submitting an enquiry, creating an account, or placing an order, you agree to be bound by these Terms and our Privacy Policy. If you are acting on behalf of a company or organisation, you represent that you have authority to bind that entity.",
        "If you do not agree with any part of these Terms, you must not use our website or services.",
      ],
    },
    {
      id: "business-model",
      title: "2. Nature of Our Services",
      paragraphs: [
        "Irozen is a manufacturer and supplier of hardware items, agriculture tools, hand pumps, hand pump parts, industrial equipment, scaffolding fittings, construction hardware, and related engineering products.",
        "Product listings on our website are for information and enquiry purposes. Prices, stock status, specifications, and images are indicative unless confirmed in a formal quotation, proforma invoice, or purchase order acceptance. We reserve the right to correct errors, update specifications, or withdraw listings without prior notice.",
        "A binding contract is formed only when we expressly accept your purchase order or issue a confirmed proforma invoice/quotation and you accept the stated commercial terms.",
      ],
    },
    {
      id: "eligibility",
      title: "3. Eligibility & Account Registration",
      list: [
        "You must be at least 18 years old and legally capable of entering into contracts under Indian law.",
        "Business customers must provide accurate company, contact, and tax details where applicable.",
        "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
        "We may suspend or terminate accounts that provide false information, violate these Terms, or engage in abusive or fraudulent conduct.",
      ],
    },
    {
      id: "enquiries-orders",
      title: "4. Enquiries, Quotations & Orders",
      paragraphs: [
        "Submitting an enquiry does not guarantee product availability, pricing, or delivery timelines. Our sales team will confirm specifications, freight, taxes, and payment terms before order confirmation.",
        "You agree to provide complete and accurate information regarding product requirements, quantities, delivery location, and intended use. Incorrect information may affect pricing, dispatch, or acceptance of returns.",
        "We may refuse or cancel orders at our discretion where products are unavailable, pricing was displayed in error, credit terms are not met, export or regulatory restrictions apply, or we suspect fraudulent activity.",
      ],
    },
    {
      id: "pricing-payment",
      title: "5. Pricing, Taxes & Payment",
      list: [
        "All prices are quoted in Indian Rupees (INR) unless otherwise stated.",
        "Prices may exclude GST, freight, packing, insurance, octroi, or other statutory levies unless explicitly included in writing.",
        "Payment terms—advance, part advance, credit, or LC—will be specified in the confirmed quotation or invoice.",
        "Delayed payments may attract interest, suspension of dispatch, or cancellation of open orders as permitted by law and our commercial policy.",
        "Title and risk in goods pass as stated in the confirmed order or invoice, typically upon dispatch or delivery as agreed.",
      ],
    },
    {
      id: "product-information",
      title: "6. Product Information & Warranties",
      paragraphs: [
        "We endeavour to display accurate product descriptions, dimensions, materials, and compatibility information. However, minor variations in colour, finish, weight, or packaging may occur due to manufacturing batches or photography limitations.",
        "Technical drawings, OEM references, and compatibility notes are provided in good faith. Customers remain responsible for verifying suitability for their intended application before installation or use.",
        "Unless expressly stated in writing, our supply is subject to standard commercial warranties applicable to the product category and does not extend to misuse, improper installation, unauthorised modification, or normal wear and tear.",
      ],
    },
    {
      id: "intellectual-property",
      title: "7. Intellectual Property",
      paragraphs: [
        "All website content—including logos, text, images, catalogue structure, and software—is owned by or licensed to Irozen and protected under applicable intellectual property laws. You may not copy, scrape, republish, or commercially exploit our content without prior written consent.",
        "Customer-provided designs, trademarks, or OEM specifications remain the property of the respective owner. Custom manufacturing is subject to separate written agreements regarding tooling, confidentiality, and IP ownership.",
      ],
    },
    {
      id: "acceptable-use",
      title: "8. Acceptable Use",
      list: [
        "Do not use our website for unlawful, misleading, or harmful purposes.",
        "Do not attempt unauthorised access to our systems, accounts, or data.",
        "Do not upload malware, spam, or content that infringes third-party rights.",
        "Do not interfere with website availability or automated scraping beyond reasonable personal use.",
        "Do not misrepresent your identity, affiliation, or purchasing authority.",
      ],
    },
    {
      id: "limitation-liability",
      title: "9. Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by applicable law, Irozen shall not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of profit, production downtime, or project delay arising from use of our website or products.",
        "Our aggregate liability for any claim relating to a confirmed order shall not exceed the invoice value of the specific products giving rise to the claim, except where liability cannot be limited under mandatory consumer or commercial law.",
        "We are not responsible for delays or failures caused by events beyond reasonable control, including natural disasters, strikes, transport disruptions, government actions, or supplier shortages.",
      ],
    },
    {
      id: "indemnity",
      title: "10. Indemnity",
      paragraphs: [
        "You agree to indemnify and hold harmless Irozen, its directors, employees, and agents from claims, losses, or expenses arising from your breach of these Terms, misuse of products contrary to specifications, or violation of applicable laws or third-party rights.",
      ],
    },
    {
      id: "governing-law",
      title: "11. Governing Law & Dispute Resolution",
      paragraphs: [
        "These Terms are governed by the laws of India. Courts at Howrah, West Bengal shall have exclusive jurisdiction, subject to any mandatory statutory forum for consumer or commercial disputes.",
        "Before initiating formal proceedings, parties agree to attempt good-faith resolution through direct communication with our customer support team.",
      ],
    },
    {
      id: "changes-contact",
      title: "12. Changes & Contact",
      paragraphs: [
        "We may revise these Terms at any time by posting an updated version on this page. Material changes will be indicated by updating the “Last updated” date. Your continued use after changes constitutes acceptance.",
        "For questions regarding these Terms, contact us at sonuecom05@gmail.com, +91 6202668606, or via the contact form at irozen.in/contact.",
      ],
    },
  ],
};
