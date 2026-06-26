import type { Metadata } from "next";

import LegalDocumentView from "@/app/(shop)/legal/LegalDocumentView";
import { privacyPolicyDocument } from "@/app/(shop)/legal/legal-content/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Irozen",
  description: privacyPolicyDocument.description,
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentView document={privacyPolicyDocument} />;
}
