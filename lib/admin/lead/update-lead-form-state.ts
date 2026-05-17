import type { LeadTier } from "./types";

export const LEAD_TIER_OPTIONS: readonly LeadTier[] = [
  "COLD",
  "WARM",
  "HOT",
  "CONVERTED",
];

export type UpdateLeadFormState = {
  ok: boolean;
  message: string;
};

export const updateLeadFormInitialState: UpdateLeadFormState = {
  ok: true,
  message: "",
};
