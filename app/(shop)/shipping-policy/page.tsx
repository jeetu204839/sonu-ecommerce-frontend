import type { Metadata } from "next";

import LegalDocumentView from "@/app/(shop)/legal/LegalDocumentView";
import { shippingPolicyDocument } from "@/app/(shop)/legal/legal-content/shipping-policy";

export const metadata: Metadata = {
  title: "Shipping Policy | Irozen",
  description: shippingPolicyDocument.description,
};

export default function ShippingPolicyPage() {
  return <LegalDocumentView document={shippingPolicyDocument} />;
}
