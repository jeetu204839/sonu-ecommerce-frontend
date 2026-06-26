import type { Metadata } from "next";

import LegalDocumentView from "@/app/(shop)/legal/LegalDocumentView";
import { termsAndConditionsDocument } from "@/app/(shop)/legal/legal-content/terms-and-conditions";

export const metadata: Metadata = {
  title: "Terms & Conditions | Irozen",
  description: termsAndConditionsDocument.description,
};

export default function TermsAndConditionsPage() {
  return <LegalDocumentView document={termsAndConditionsDocument} />;
}
