import Link from "next/link";

import {
  displayUserName,
  formatLeadDate,
  formatUserPhone,
  highIntentBadge,
  leadUserDetailHref,
} from "@/app/admin/leads/format";
import type { LeadProductReviewerStat } from "@/lib/admin/lead";

type Props = Readonly<{
  rows: LeadProductReviewerStat[];
}>;

export default function LeadProductTopReviewersTable({ rows }: Props) {
  return (
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">Top reviewers</h3>
        <span className="badge bg-light-blue pull-right" style={{ marginTop: 3 }}>
          {rows.length} reviewer{rows.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="box-body no-padding">
        <table className="table table-condensed table-striped">
          <thead>
            <tr>
              <th style={{ width: 48 }}>#</th>
              <th>Reviewer</th>
              <th>Phone</th>
              <th className="text-center">Reviews</th>
              <th className="text-center">Days</th>
              <th>First review</th>
              <th>Last review</th>
              <th className="text-center">High intent</th>
              <th style={{ width: 72 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted">
                  No reviewers for this product yet.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => {
                const u = row.user;
                const intent = highIntentBadge(row.isHighIntent);
                return (
                  <tr key={row.id}>
                    <td>{idx + 1}.</td>
                    <td>
                      <Link href={leadUserDetailHref(u.id)}>
                        <strong>
                          {displayUserName(u.name, u.phoneNumber, u.email)}
                        </strong>
                      </Link>
                    </td>
                    <td className="text-muted small">
                      {formatUserPhone(u.phoneNumber, u.countryCode)}
                    </td>
                    <td className="text-center">
                      <span className="badge bg-light-blue">
                        {row.totalReviewCount}
                      </span>
                    </td>
                    <td className="text-center">{row.distinctReviewDays}</td>
                    <td>{formatLeadDate(row.firstReviewDate)}</td>
                    <td>{formatLeadDate(row.lastReviewDate)}</td>
                    <td className="text-center">
                      <span className={intent.className}>{intent.text}</span>
                    </td>
                    <td>
                      <Link
                        href={leadUserDetailHref(u.id)}
                        className="btn btn-default btn-sm"
                        title="Lead detail"
                      >
                        <i className="fa fa-eye" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
