import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WEBSITE,
} from "@/app/(shop)/contact/contact-data";

export const REVIEW_FEEDBACK_INTRO =
  "At IROZEN, every customer opinion matters. Your genuine review helps us improve our hardware, agricultural, industrial, and infrastructure products while helping future customers make better purchasing decisions.";

export const REVIEW_FEEDBACK_BENEFITS = [
  "Genuine Product Experience",
  "Better Customer Service",
  "Product Quality Improvement",
  "Dealer & Distributor Satisfaction",
] as const;

export const REVIEW_TOPICS = [
  "Product Quality",
  "Packaging",
  "Delivery Experience",
  "Customer Support",
  "Product Performance",
  "Overall Buying Experience",
] as const;

export const REVIEW_RATING_OPTIONS = [
  { value: "5", label: "Excellent" },
  { value: "4", label: "Very Good" },
  { value: "3", label: "Good" },
  { value: "2", label: "Average" },
  { value: "1", label: "Poor" },
] as const;

export const REVIEW_FEEDBACK_FAQ = [
  {
    question: "Can I submit feedback without purchasing?",
    answer:
      "We encourage feedback from genuine customers who have purchased or used IROZEN products.",
  },
  {
    question: "Can dealers submit reviews?",
    answer:
      "Yes. Dealers, distributors, wholesalers, retailers, contractors, and end users are welcome to share their experience.",
  },
  {
    question: "Are all reviews published?",
    answer:
      "Reviews are moderated to prevent spam, abusive language, fake content, or misleading information.",
  },
] as const;

export const REVIEW_FEEDBACK_CONTACT = {
  phone: CONTACT_PHONE,
  website: CONTACT_WEBSITE,
  email: CONTACT_EMAIL,
} as const;
