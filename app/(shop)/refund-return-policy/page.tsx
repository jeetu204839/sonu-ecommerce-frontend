import type { Metadata } from "next";

import LegalDocumentView from "@/app/(shop)/legal/LegalDocumentView";
import { refundReturnPolicyDocument } from "@/app/(shop)/legal/legal-content/refund-return-policy";

export const metadata: Metadata = {
  title: "Refund & Return Policy | Irozen",
  description: refundReturnPolicyDocument.description,
};

export default function RefundReturnPolicyPage() {
  return <LegalDocumentView document={refundReturnPolicyDocument} />;
}
