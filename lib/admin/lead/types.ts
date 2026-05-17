/** Lead tier values from review / lead scoring API. */
export type LeadTier = "COLD" | "WARM" | "HOT" | "CONVERTED";

export type LeadTierBreakdown = Record<LeadTier, number>;

export type LeadReviewDashboardKpi = {
  totalLeads: number;
  highIntentPairs: number;
  reviewsToday: number;
  dailyRowsToday: number;
  leadTierBreakdown: LeadTierBreakdown;
};

export type LeadTopProductSummary = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  mrp: number;
  status: string;
  imageUrl: string | null;
};

export type LeadTopProductRow = {
  productId: number;
  totalReviewCount: number;
  product: LeadTopProductSummary;
};

export type LeadDashboardUser = {
  id: number;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  countryCode: string | null;
  isActive: boolean;
};

export type LeadRecentHotLeadRow = {
  id: number;
  userId: number;
  totalReviewCount: number;
  uniqueProductsReviewed: number;
  distinctReviewDays: number;
  lastReviewDate: string;
  leadScore: number;
  leadTier: LeadTier | string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user: LeadDashboardUser;
};

export type LeadReviewDashboardData = {
  kpi: LeadReviewDashboardKpi;
  topProducts: LeadTopProductRow[];
  recentHotLeads: LeadRecentHotLeadRow[];
};

export type LeadReviewsPagination = {
  total_count: number;
  current_page: number;
  next_page: number | null;
  previous_page: number | null;
  total_pages: number;
  per_page: number;
};

export type LeadDailyReviewRow = {
  id: number;
  userId: number;
  productId: number;
  reviewDate: string;
  reviewCount: number;
  source: string;
  lastReviewedAt: string;
  user: LeadDashboardUser;
  product: LeadTopProductSummary;
};

export type LeadDailyReviewsListData = {
  reviews: LeadDailyReviewRow[];
  pagination: LeadReviewsPagination;
};

export type LeadProductStatRow = {
  id: number;
  userId: number;
  productId: number;
  totalReviewCount: number;
  distinctReviewDays: number;
  firstReviewDate: string;
  lastReviewDate: string;
  isHighIntent: boolean;
  user: LeadDashboardUser;
  product: LeadTopProductSummary;
};

export type LeadProductStatsListData = {
  stats: LeadProductStatRow[];
  pagination: LeadReviewsPagination;
};

export type LeadScoredLeadsListData = {
  leads: LeadRecentHotLeadRow[];
  pagination: LeadReviewsPagination;
};

export type LeadDetailUser = LeadDashboardUser & {
  country: string | null;
  lastLogin: string | null;
  createdAt: string;
};

export type LeadProfile = {
  id: number;
  userId: number;
  totalReviewCount: number;
  uniqueProductsReviewed: number;
  distinctReviewDays: number;
  lastReviewDate: string;
  leadScore: number;
  leadTier: LeadTier | string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LeadDailyReviewWithProduct = {
  id: number;
  userId: number;
  productId: number;
  reviewDate: string;
  reviewCount: number;
  source: string;
  lastReviewedAt: string;
  product: LeadTopProductSummary;
};

export type LeadProductStatWithProduct = {
  id: number;
  userId: number;
  productId: number;
  totalReviewCount: number;
  distinctReviewDays: number;
  firstReviewDate: string;
  lastReviewDate: string;
  isHighIntent: boolean;
  product: LeadTopProductSummary;
};

export type LeadUserDetailData = {
  user: LeadDetailUser;
  leadProfile: LeadProfile;
  productStats: LeadProductStatWithProduct[];
  recentDaily: LeadDailyReviewWithProduct[];
};

export type LeadReviewProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type LeadReviewProductVendor = {
  id: number;
  storeName: string;
  storeSlug: string;
};

export type LeadReviewProductDetail = LeadTopProductSummary & {
  category: LeadReviewProductCategory;
  vendor: LeadReviewProductVendor;
};

export type LeadProductReviewSummary = {
  uniqueReviewers: number;
  totalReviewEvents: number;
  highIntentReviewers: number;
};

export type LeadProductReviewerStat = {
  id: number;
  userId: number;
  productId: number;
  totalReviewCount: number;
  distinctReviewDays: number;
  firstReviewDate: string;
  lastReviewDate: string;
  isHighIntent: boolean;
  user: LeadDashboardUser;
};

export type LeadProductDailyTrendPoint = {
  reviewDate: string;
  reviewCount: number;
};

export type LeadProductReviewDetailData = {
  product: LeadReviewProductDetail;
  summary: LeadProductReviewSummary;
  topReviewers: LeadProductReviewerStat[];
  dailyTrend: LeadProductDailyTrendPoint[];
};
