import Link from "next/link";

import type { LeadReviewDashboardKpi, LeadTier } from "@/lib/admin/lead";

import LeadBoxViewAllLink from "./LeadBoxViewAllLink";
import { leadModuleRoutes, leadTierDisplayLabel } from "./format";

const TIER_ORDER: LeadTier[] = ["HOT", "WARM", "COLD", "CONVERTED"];

type Props = Readonly<{
  kpi: LeadReviewDashboardKpi;
}>;

function tierLabelClass(tier: LeadTier): string {
  if (tier === "HOT") return "label-danger";
  if (tier === "WARM") return "label-warning";
  if (tier === "CONVERTED") return "label-success";
  return "label-default";
}

const KPI_CARDS = [
  {
    key: "totalLeads",
    label: "Total leads",
    boxClass: "bg-aqua",
    iconClass: "ion ion-person-stalker",
  },
  {
    key: "highIntentPairs",
    label: "High-intent pairs",
    boxClass: "bg-yellow",
    iconClass: "ion ion-fireball",
  },
  {
    key: "reviewsToday",
    label: "Reviews today",
    boxClass: "bg-green",
    iconClass: "ion ion-eye",
  },
  {
    key: "dailyRowsToday",
    label: "Daily rows today",
    boxClass: "bg-red",
    iconClass: "ion ion-calendar",
  },
] as const;

const KPI_HREFS: Record<(typeof KPI_CARDS)[number]["key"], string> = {
  totalLeads: leadModuleRoutes.scoredLeads,
  highIntentPairs: leadModuleRoutes.productStats,
  reviewsToday: leadModuleRoutes.daily,
  dailyRowsToday: leadModuleRoutes.daily,
};

export default function LeadKpiCards({ kpi }: Props) {
  const breakdown = kpi.leadTierBreakdown;

  return (
    <>
      <div className="row lead-kpi-row">
        {KPI_CARDS.map((card) => (
          <div key={card.key} className="col-lg-3 col-xs-6">
            <Link
              href={KPI_HREFS[card.key]}
              className={`small-box ${card.boxClass} lead-kpi-stat lead-kpi-card-link`}
            >
              <div className="inner">
                <h3>{kpi[card.key]}</h3>
                <p>{card.label}</p>
              </div>
              <div className="icon" aria-hidden="true">
                <i className={card.iconClass} />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-xs-12">
          <div className="box box-solid">
            <div className="box-header with-border">
              <h3 className="box-title">Lead tier breakdown</h3>
            </div>
            <div className="box-body">
              <div className="row text-center">
                {TIER_ORDER.map((tier) => (
                  <div
                    key={tier}
                    className="col-xs-6 col-sm-3 lead-tier-cell"
                  >
                    <span
                      className={`label ${tierLabelClass(tier)}`}
                      style={{ fontSize: 13 }}
                    >
                      {leadTierDisplayLabel(tier)}
                    </span>
                    <div className="h3 lead-tier-count">
                      {breakdown[tier] ?? 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <LeadBoxViewAllLink
              href={leadModuleRoutes.scoredLeads}
              label="View all scored leads"
            />
          </div>
        </div>
      </div>
    </>
  );
}
