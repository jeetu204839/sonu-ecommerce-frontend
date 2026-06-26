export type LegalSection = Readonly<{
  id: string;
  title: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
}>;

export type LegalDocument = Readonly<{
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: readonly LegalSection[];
}>;

export const LEGAL_PAGE_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-return-policy", label: "Refund & Return Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
] as const;
