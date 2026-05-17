import { adminApiGetEnvelope, adminApiPatchEnvelope } from "@/lib/admin/http";

import type {
  LeadDailyReviewsListData,
  LeadProductReviewDetailData,
  LeadProductStatsListData,
  LeadProfile,
  LeadReviewDashboardData,
  LeadScoredLeadsListData,
  LeadTier,
  LeadUserDetailData,
} from "./types";

export type UpdateLeadReviewPayload = {
  leadTier: LeadTier;
  notes: string;
};

const LEAD_REVIEW_DASHBOARD_PATH = "/admin/review/dashboard";
const LEAD_REVIEW_DAILY_PATH = "/admin/review/daily";
const LEAD_REVIEW_PRODUCT_STATS_PATH = "/admin/review/product-stats";
const LEAD_REVIEW_PRODUCTS_PATH = "/admin/review/products";
const LEAD_REVIEW_LEADS_PATH = "/admin/review/leads";

/**
 * GET /admin/review/dashboard — KPIs, top reviewed products, recent hot leads.
 */
export async function fetchLeadReviewDashboard(): Promise<
  | { ok: true; data: LeadReviewDashboardData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  return adminApiGetEnvelope<LeadReviewDashboardData>(LEAD_REVIEW_DASHBOARD_PATH);
}

/**
 * GET /admin/review/daily?page={n} — paginated daily product review rows.
 */
export async function fetchLeadDailyReviewsPage(page: number): Promise<
  | { ok: true; data: LeadDailyReviewsListData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const query = new URLSearchParams({ page: String(safePage) });
  return adminApiGetEnvelope<LeadDailyReviewsListData>(
    `${LEAD_REVIEW_DAILY_PATH}?${query.toString()}`,
  );
}

/**
 * GET /admin/review/product-stats?page={n} — per user–product review aggregates.
 */
export async function fetchLeadProductStatsPage(page: number): Promise<
  | { ok: true; data: LeadProductStatsListData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const query = new URLSearchParams({ page: String(safePage) });
  return adminApiGetEnvelope<LeadProductStatsListData>(
    `${LEAD_REVIEW_PRODUCT_STATS_PATH}?${query.toString()}`,
  );
}

/**
 * GET /admin/review/leads?page={n} — paginated scored leads list.
 */
export async function fetchLeadLeadsPage(page: number): Promise<
  | { ok: true; data: LeadScoredLeadsListData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const query = new URLSearchParams({ page: String(safePage) });
  return adminApiGetEnvelope<LeadScoredLeadsListData>(
    `${LEAD_REVIEW_LEADS_PATH}?${query.toString()}`,
  );
}

/**
 * GET /admin/review/leads/{userId} — full lead profile for one storefront user.
 */
export async function fetchLeadUserDetail(userId: number): Promise<
  | { ok: true; data: LeadUserDetailData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  if (!Number.isFinite(userId) || userId < 1) {
    return { ok: false, message: "Invalid user id." };
  }
  return adminApiGetEnvelope<LeadUserDetailData>(
    `${LEAD_REVIEW_LEADS_PATH}/${Math.floor(userId)}`,
  );
}

/**
 * GET /admin/review/products/{productId} — review analytics for one product.
 */
export async function fetchLeadProductReviewDetail(
  productId: number,
): Promise<
  | { ok: true; data: LeadProductReviewDetailData }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  if (!Number.isFinite(productId) || productId < 1) {
    return { ok: false, message: "Invalid product id." };
  }
  return adminApiGetEnvelope<LeadProductReviewDetailData>(
    `${LEAD_REVIEW_PRODUCTS_PATH}/${Math.floor(productId)}`,
  );
}

/**
 * PATCH /admin/review/leads/{userId} — update tier and notes for a scored lead.
 * Uses the storefront user id (same as GET detail), not `leadProfile.id`.
 */
export async function updateLeadReview(
  userId: number,
  payload: UpdateLeadReviewPayload,
): Promise<
  | { ok: true; data: LeadProfile | null; message?: string }
  | {
      ok: false;
      message: string;
      unauthorized?: boolean;
      fieldErrors?: Record<string, string>;
    }
> {
  if (!Number.isFinite(userId) || userId < 1) {
    return { ok: false, message: "Invalid user id." };
  }

  return adminApiPatchEnvelope<LeadProfile>(
    `${LEAD_REVIEW_LEADS_PATH}/${Math.floor(userId)}`,
    {
      leadTier: payload.leadTier,
      notes: payload.notes,
    },
  );
}
