import type { ReactNode } from "react";

import type { LeadUserDetailData } from "@/lib/admin/lead";

import {
  displayUserName,
  formatLeadDate,
  formatLeadDateTime,
  formatUserPhone,
  leadTierDisplayLabel,
  leadTierLabelClass,
} from "@/app/admin/leads/format";

import LeadProfileEditForm from "./LeadProfileEditForm";
import LeadUserProductStatsTable from "./LeadUserProductStatsTable";
import LeadUserRecentDailyTable from "./LeadUserRecentDailyTable";

type Props = Readonly<{
  data: LeadUserDetailData;
}>;

function DefinitionRow({
  label,
  children,
}: Readonly<{ label: string; children: ReactNode }>) {
  return (
    <>
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </>
  );
}

function MetricCard({
  value,
  label,
}: Readonly<{ value: number; label: string }>) {
  return (
    <div className="col-xs-6 col-sm-3">
      <div className="lead-detail-metric">
        <div className="lead-detail-metric-value">{value}</div>
        <div className="text-muted small">{label}</div>
      </div>
    </div>
  );
}

export default function LeadUserDetailView({ data }: Props) {
  const { user, leadProfile, productStats, recentDaily } = data;
  const displayName = displayUserName(
    user.name,
    user.phoneNumber,
    user.email,
  );
  const phone = formatUserPhone(user.phoneNumber, user.countryCode);

  return (
    <>
      <div className="row">
        <div className="col-md-5">
          <div className="box box-solid">
            <div className="box-header with-border">
              <h3 className="box-title">
                <i className="fa fa-user margin-r-5" />
                User
              </h3>
            </div>
            <div className="box-body">
              <dl className="dl-horizontal lead-detail-dl lead-detail-dl-compact">
                <DefinitionRow label="Display name">{displayName}</DefinitionRow>
                <DefinitionRow label="User ID">{user.id}</DefinitionRow>
                <DefinitionRow label="Phone">{phone}</DefinitionRow>
                <DefinitionRow label="Email">
                  {user.email?.trim() ? user.email : "—"}
                </DefinitionRow>
                <DefinitionRow label="Country">
                  {user.country?.trim() ? user.country : "—"}
                </DefinitionRow>
                <DefinitionRow label="Status">
                  {user.isActive ? (
                    <span className="label label-success">Active</span>
                  ) : (
                    <span className="label label-warning">Inactive</span>
                  )}
                </DefinitionRow>
                <DefinitionRow label="Last login">
                  {user.lastLogin
                    ? formatLeadDateTime(user.lastLogin)
                    : "—"}
                </DefinitionRow>
                <DefinitionRow label="Registered">
                  {formatLeadDateTime(user.createdAt)}
                </DefinitionRow>
              </dl>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">
                <i className="fa fa-line-chart margin-r-5" />
                Lead profile
              </h3>
              <div className="box-tools pull-right">
                <span
                  className={`label ${leadTierLabelClass(leadProfile.leadTier)}`}
                  style={{ fontSize: 13 }}
                >
                  {leadTierDisplayLabel(leadProfile.leadTier)}
                </span>
              </div>
            </div>
            <div className="box-body">
              <div className="row text-center">
                <MetricCard value={leadProfile.leadScore} label="Lead score" />
                <MetricCard
                  value={leadProfile.totalReviewCount}
                  label="Total reviews"
                />
                <MetricCard
                  value={leadProfile.uniqueProductsReviewed}
                  label="Products"
                />
                <MetricCard
                  value={leadProfile.distinctReviewDays}
                  label="Review days"
                />
              </div>

              <hr className="margin-sm" />

              <dl className="dl-horizontal lead-detail-dl mb-0">
                <DefinitionRow label="Lead ID">{leadProfile.id}</DefinitionRow>
                <DefinitionRow label="Last review">
                  {formatLeadDate(leadProfile.lastReviewDate)}
                </DefinitionRow>
                <DefinitionRow label="Profile created">
                  {formatLeadDateTime(leadProfile.createdAt)}
                </DefinitionRow>
                <DefinitionRow label="Profile updated">
                  {formatLeadDateTime(leadProfile.updatedAt)}
                </DefinitionRow>
              </dl>

              <hr className="margin-sm" />

              <h4 className="text-muted" style={{ marginTop: 0, fontSize: 14 }}>
                <i className="fa fa-pencil margin-r-5" />
                Update tier &amp; notes
              </h4>
              <LeadProfileEditForm
                userId={user.id}
                initialLeadTier={leadProfile.leadTier}
                initialNotes={leadProfile.notes}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <LeadUserProductStatsTable rows={productStats} />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <LeadUserRecentDailyTable rows={recentDaily} />
        </div>
      </div>
    </>
  );
}
