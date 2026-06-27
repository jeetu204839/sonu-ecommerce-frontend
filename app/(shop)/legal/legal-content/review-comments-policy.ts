import type { LegalDocument } from "@/app/(shop)/legal/legal-types";

export const reviewCommentsPolicyDocument: LegalDocument = {
  slug: "review-comments-policy",
  title: "Review & Comments Policy",
  description:
    "Read the official Review & Comments Policy of IROZEN. Learn our guidelines for submitting genuine product reviews and comments.",
  lastUpdated: "01 July 2026",
  sections: [
    {
      id: "overview",
      title: "1. Overview",
      paragraphs: [
        "At IROZEN, we value honest and constructive feedback from our customers. Reviews help other buyers make informed purchasing decisions and help us improve our products and services.",
        "By submitting a review or comment on our website, you agree to follow the guidelines mentioned in this policy.",
      ],
    },
    {
      id: "genuine-reviews",
      title: "2. Genuine Reviews Only",
      paragraphs: [
        "We encourage reviews only from customers who have genuine experience with our products.",
      ],
      list: [
        "Share your real experience.",
        "Write clear and helpful feedback.",
        "Mention product performance honestly.",
      ],
    },
    {
      id: "review-guidelines",
      title: "3. Review Guidelines",
      paragraphs: ["You may share your experience regarding:"],
      list: [
        "Product Quality",
        "Durability",
        "Packaging",
        "Ease of Use",
        "Overall Satisfaction",
        "Customer Service Experience",
      ],
    },
    {
      id: "removed-reviews",
      title: "4. Reviews That Will Be Removed",
      list: [
        "Fake or misleading reviews.",
        "Spam or repeated comments.",
        "Abusive, offensive, or threatening language.",
        "Political or religious content.",
        "Promotional links or advertisements.",
        "Competitor promotion.",
        "Personal contact details.",
        "Illegal or harmful content.",
      ],
    },
    {
      id: "moderation",
      title: "5. Review Moderation",
      paragraphs: [
        "IROZEN reserves the right to review, approve, edit, reject, or remove any review or comment that violates this policy or may mislead other customers.",
        "Genuine positive and constructive negative reviews are welcome. We do not remove reviews solely because they express a negative opinion.",
      ],
    },
    {
      id: "product-issues",
      title: "6. Product Issues",
      paragraphs: [
        "If your product has a manufacturing defect or you experience any product-related issue, we recommend contacting our support team before posting a public review. Our team will do its best to resolve your concern promptly.",
      ],
    },
    {
      id: "no-compensation",
      title: "7. No Compensation",
      paragraphs: [
        "Reviews and comments are submitted voluntarily. IROZEN does not offer payment, discounts, gifts, or compensation in exchange for positive reviews.",
      ],
    },
    {
      id: "contact",
      title: "8. Contact Us",
      paragraphs: [
        "IROZEN",
        "Website: https://irozen.in",
        "Email: sonuecom05@gmail.com",
        "WhatsApp: +91 6202668606",
      ],
    },
  ],
};
