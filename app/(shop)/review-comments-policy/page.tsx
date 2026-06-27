import type { Metadata } from "next";

import LegalDocumentView from "@/app/(shop)/legal/LegalDocumentView";
import { reviewCommentsPolicyDocument } from "@/app/(shop)/legal/legal-content/review-comments-policy";

export const metadata: Metadata = {
  title: "Review & Comments Policy | Irozen",
  description: reviewCommentsPolicyDocument.description,
};

export default function ReviewCommentsPolicyPage() {
  return <LegalDocumentView document={reviewCommentsPolicyDocument} />;
}
