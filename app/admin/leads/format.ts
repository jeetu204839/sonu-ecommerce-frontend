import type { LeadTier } from "@/lib/admin/lead/types";

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLeadDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatLeadDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function leadTierLabelClass(tier: string): string {
  const t = tier.toUpperCase();
  if (t === "HOT") return "label-danger";
  if (t === "WARM") return "label-warning";
  if (t === "CONVERTED") return "label-success";
  return "label-default";
}

export function leadTierDisplayLabel(tier: LeadTier | string): string {
  const t = tier.trim().toUpperCase();
  if (t === "COLD") return "Cold";
  if (t === "WARM") return "Warm";
  if (t === "HOT") return "Hot";
  if (t === "CONVERTED") return "Converted";
  return tier.trim() || "—";
}

export function formatUserPhone(
  phone: string | null,
  countryCode: string | null,
): string {
  const p = phone?.trim();
  if (!p) return "—";
  const cc = countryCode?.trim();
  return cc ? `+${cc} ${p}` : p;
}

export function displayUserName(
  name: string | null,
  phone: string | null,
  email: string | null,
): string {
  if (name?.trim()) return name.trim();
  if (phone?.trim()) return phone.trim();
  if (email?.trim()) return email.trim();
  return "Unknown user";
}

/** Leads module list routes — use for nav/toolbars (single source of truth). */
export const leadModuleRoutes = {
  dashboard: "/admin/leads",
  daily: "/admin/leads/daily",
  productStats: "/admin/leads/product-stats",
  scoredLeads: "/admin/leads/leads",
} as const;

export type LeadModuleSection = keyof typeof leadModuleRoutes;

export function leadUserDetailHref(userId: number): string {
  return `${leadModuleRoutes.scoredLeads}/${userId}`;
}

export function leadProductReviewDetailHref(productId: number): string {
  return `/admin/leads/products/${productId}`;
}

export function highIntentBadge(isHighIntent: boolean): {
  className: string;
  text: string;
} {
  return isHighIntent
    ? { className: "label label-success", text: "Yes" }
    : { className: "label label-default", text: "No" };
}
