import Link from "next/link";

import type { LeadRecentHotLeadRow } from "@/lib/admin/lead";

import LeadBoxViewAllLink from "./LeadBoxViewAllLink";
import {
  displayUserName,
  formatLeadDate,
  formatLeadDateTime,
  formatUserPhone,
  leadModuleRoutes,
  leadTierDisplayLabel,
  leadTierLabelClass,
  leadUserDetailHref,
} from "./format";

type Props = Readonly<{
  rows: LeadRecentHotLeadRow[];
}>;

export default function RecentHotLeadsTable({ rows }: Props) {
  return (
    <div className="box box-warning">
      <div className="box-header with-border">
        <h3 className="box-title">Recent hot &amp; warm leads</h3>
        <div className="box-tools pull-right">
          <Link
            href={leadModuleRoutes.scoredLeads}
            className="btn btn-box-tool"
            title="View all scored leads"
          >
            <i className="fa fa-external-link" />
          </Link>
        </div>
      </div>
      <div className="box-body no-padding">
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th style={{ width: 48 }}>#</th>
              <th>Contact</th>
              <th className="text-center">Tier</th>
              <th className="text-right">Score</th>
              <th className="text-right">Reviews</th>
              <th className="text-right">Products</th>
              <th className="text-right">Days</th>
              <th>Last review</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted">
                  No hot or warm leads in the latest snapshot.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => {
                const u = row.user;
                const phone = formatUserPhone(u.phoneNumber, u.countryCode);
                return (
                  <tr key={row.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>
                        <Link href={leadUserDetailHref(u.id)}>
                          {displayUserName(u.name, u.phoneNumber, u.email)}
                        </Link>
                      </strong>
                      <br />
                      <span className="text-muted small">{phone}</span>
                      {u.email?.trim() ? (
                        <>
                          <br />
                          <span className="text-muted small">{u.email}</span>
                        </>
                      ) : null}
                    </td>
                    <td className="text-center">
                      <span className={`label ${leadTierLabelClass(row.leadTier)}`}>
                        {leadTierDisplayLabel(row.leadTier)}
                      </span>
                    </td>
                    <td className="text-right">
                      <strong>{row.leadScore}</strong>
                    </td>
                    <td className="text-right">{row.totalReviewCount}</td>
                    <td className="text-right">{row.uniqueProductsReviewed}</td>
                    <td className="text-right">{row.distinctReviewDays}</td>
                    <td>{formatLeadDate(row.lastReviewDate)}</td>
                    <td className="text-muted small">
                      {formatLeadDateTime(row.updatedAt)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <LeadBoxViewAllLink
        href={leadModuleRoutes.scoredLeads}
        label="View all scored leads"
      />
    </div>
  );
}
