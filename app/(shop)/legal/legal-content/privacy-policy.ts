import type { LegalDocument } from "@/app/(shop)/legal/legal-types";

export const privacyPolicyDocument: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description:
    "How Irozen collects, uses, stores, and protects your personal information when you use our website and B2B enquiry services.",
  lastUpdated: "26 June 2026",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      paragraphs: [
        "Irozen (“we”, “us”, “our”) operates the website irozen.in and related B2B enquiry channels for hardware, agriculture tools, hand pumps, industrial equipment, and engineering products across India.",
        "This Privacy Policy explains how we collect, use, disclose, store, and safeguard personal information when you browse our catalogue, submit product enquiries, register for an account, or communicate with us by phone, email, or WhatsApp.",
        "By using our website or sharing information with us, you acknowledge that you have read this Privacy Policy. If you do not agree, please discontinue use of our services.",
      ],
    },
    {
      id: "scope",
      title: "2. Scope & Applicability",
      paragraphs: [
        "This policy applies to information collected through our website, enquiry forms, customer support channels, and related business communications. It does not apply to third-party websites linked from our platform, which maintain their own privacy practices.",
        "Our services are primarily intended for businesses, distributors, contractors, government buyers, and professional purchasers in India. Where applicable, we process data in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian laws.",
      ],
    },
    {
      id: "information-we-collect",
      title: "3. Information We Collect",
      paragraphs: [
        "We collect only information reasonably necessary to respond to enquiries, fulfil orders, provide quotations, and maintain business relationships.",
      ],
      list: [
        "Identity & contact details: name, company name, designation, email address, mobile number, billing and delivery address, city, state, and PIN code.",
        "Account information: login credentials, OTP verification records, and profile preferences when you create or use a shop account.",
        "Enquiry & order details: product names, SKUs, quantities, specifications, delivery timelines, project references, and messages you submit through forms or WhatsApp.",
        "Technical data: IP address, browser type, device information, pages visited, referral URLs, session timestamps, and cookies required for site functionality and security.",
        "Communication records: call logs, email correspondence, support tickets, and chat transcripts where permitted by law.",
        "Compliance documents: GSTIN, purchase orders, tender references, or identity proofs when required for institutional, export, or high-value transactions.",
      ],
    },
    {
      id: "how-we-use",
      title: "4. How We Use Your Information",
      list: [
        "To respond to product enquiries, prepare quotations, and confirm availability.",
        "To process orders, arrange dispatch, share invoices, and provide after-sales support.",
        "To verify identity through OTP or other reasonable authentication methods.",
        "To improve website performance, catalogue accuracy, and user experience.",
        "To send transactional updates about enquiries, shipments, or account activity.",
        "To comply with legal, tax, audit, and regulatory obligations.",
        "To prevent fraud, misuse, spam, or unauthorised access to our systems.",
        "To inform registered business customers about relevant products or offers, where consent or legitimate business interest applies and opt-out is available.",
      ],
    },
    {
      id: "legal-basis",
      title: "5. Legal Basis for Processing",
      paragraphs: [
        "We process personal data based on one or more of the following grounds: your consent (for example, when submitting a form or opting in to communications), performance of a contract or pre-contractual steps at your request, compliance with legal obligations, and our legitimate business interests such as fraud prevention, record keeping, and service improvement—provided such interests are not overridden by your rights.",
      ],
    },
    {
      id: "sharing",
      title: "6. Sharing & Disclosure",
      paragraphs: [
        "We do not sell your personal information. We may share data only with trusted parties on a need-to-know basis:",
      ],
      list: [
        "Logistics partners and transporters for shipment, proof of delivery, and freight coordination.",
        "Payment gateways, banks, or accounting systems where a financial transaction is involved.",
        "Technology service providers hosting our website, email, CRM, or analytics tools under confidentiality obligations.",
        "Professional advisers such as auditors or legal counsel when required.",
        "Government authorities, courts, or law enforcement when disclosure is mandated by applicable law.",
        "Successors in the event of a merger, acquisition, or business reorganisation, subject to continued protection of your data.",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies & Similar Technologies",
      paragraphs: [
        "We use essential cookies to maintain sessions, secure login, and remember basic preferences. Analytics cookies may be used in aggregated form to understand traffic patterns and improve catalogue navigation.",
        "You can control cookies through your browser settings. Disabling essential cookies may limit account login, enquiry submission, or certain site features.",
      ],
    },
    {
      id: "retention",
      title: "8. Data Retention",
      paragraphs: [
        "We retain personal information only for as long as necessary to fulfil the purposes described in this policy, including statutory limitation periods for contracts, taxation, and dispute resolution.",
        "Enquiry records and order documentation are typically retained for a minimum period required under commercial and tax law. When data is no longer needed, we securely delete or anonymise it unless retention is legally required.",
      ],
    },
    {
      id: "security",
      title: "9. Security Measures",
      paragraphs: [
        "We implement reasonable administrative, technical, and physical safeguards appropriate to the nature of B2B e-commerce operations, including access controls, encrypted transmission where supported, and restricted internal access on a need-to-know basis.",
        "No method of transmission or storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security and encourage you to use strong credentials and protect your devices.",
      ],
    },
    {
      id: "your-rights",
      title: "10. Your Rights",
      list: [
        "Request access to personal information we hold about you.",
        "Request correction of inaccurate or incomplete data.",
        "Withdraw consent for optional marketing communications.",
        "Request deletion or restriction of processing where applicable law permits.",
        "Lodge a complaint with us first so we can address your concern promptly.",
      ],
      paragraphs: [
        "To exercise these rights, contact us using the details in Section 12. We may need to verify your identity before processing certain requests.",
      ],
    },
    {
      id: "children",
      title: "11. Children’s Privacy",
      paragraphs: [
        "Our website and B2B services are not directed at individuals under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has submitted data to us, please contact us so we can delete it.",
      ],
    },
    {
      id: "contact-changes",
      title: "12. Contact & Policy Updates",
      paragraphs: [
        "For privacy-related questions or requests, contact Irozen at sonuecom05@gmail.com or +91 6202668606. Our registered office is 142/143/7, M.S.P.C Lane, Tikiapara Station, Howrah – 711101, West Bengal, India.",
        "We may update this Privacy Policy from time to time to reflect legal, technical, or business changes. The “Last updated” date at the top of this page indicates the latest revision. Continued use of our website after changes constitutes acceptance of the updated policy.",
      ],
    },
  ],
};
