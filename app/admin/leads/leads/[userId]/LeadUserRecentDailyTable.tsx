import Link from "next/link";

import LeadBoxViewAllLink from "@/app/admin/leads/LeadBoxViewAllLink";
import LeadProductTableCell from "@/app/admin/leads/LeadProductTableCell";
import {
  formatLeadDate,
  formatLeadDateTime,
  leadModuleRoutes,
} from "@/app/admin/leads/format";
import type { LeadDailyReviewWithProduct } from "@/lib/admin/lead";

type Props = Readonly<{
  rows: LeadDailyReviewWithProduct[];
}>;

export default function LeadUserRecentDailyTable({ rows }: Props) {
  return (
    <div className="box box-warning">
      <div className="box-header with-border">
        <h3 className="box-title">Recent daily reviews</h3>
        <div className="box-tools pull-right">
          <span className="badge bg-yellow" style={{ marginTop: 3 }}>
            {rows.length} row{rows.length === 1 ? "" : "s"}
          </span>
          <Link
            href={leadModuleRoutes.daily}
            className="btn btn-box-tool"
            title="All daily reviews"
          >
            <i className="fa fa-external-link" />
          </Link>
        </div>
      </div>
      <div className="box-body no-padding">
        <table className="table table-condensed table-striped">
          <thead>
            <tr>
              <th style={{ width: 48 }}>#</th>
              <th>Product</th>
              <th>Review date</th>
              <th className="text-center">Count</th>
              <th>Source</th>
              <th>Last reviewed</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No daily review rows for this user.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={row.id}>
                  <td>{idx + 1}.</td>
                  <td style={{ minWidth: 200 }}>
                    <LeadProductTableCell product={row.product} />
                  </td>
                  <td>{formatLeadDate(row.reviewDate)}</td>
                  <td className="text-center">
                    <span className="badge bg-light-blue">{row.reviewCount}</span>
                  </td>
                  <td>
                    <span className="label label-default">{row.source}</span>
                  </td>
                  <td className="text-muted small">
                    {formatLeadDateTime(row.lastReviewedAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <LeadBoxViewAllLink
        href={leadModuleRoutes.daily}
        label="View all daily reviews"
      />
    </div>
  );
}
