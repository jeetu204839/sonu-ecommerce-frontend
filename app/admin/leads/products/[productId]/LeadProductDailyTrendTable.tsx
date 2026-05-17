import Link from "next/link";

import LeadBoxViewAllLink from "@/app/admin/leads/LeadBoxViewAllLink";
import { formatLeadDate, leadModuleRoutes } from "@/app/admin/leads/format";
import type { LeadProductDailyTrendPoint } from "@/lib/admin/lead";

type Props = Readonly<{
  rows: LeadProductDailyTrendPoint[];
}>;

export default function LeadProductDailyTrendTable({ rows }: Props) {
  return (
    <div className="box box-warning">
      <div className="box-header with-border">
        <h3 className="box-title">Daily review trend</h3>
        <div className="box-tools pull-right">
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
              <th>Review date</th>
              <th className="text-right">Review count</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted">
                  No daily trend data for this product.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={`${row.reviewDate}-${idx}`}>
                  <td>{idx + 1}.</td>
                  <td>{formatLeadDate(row.reviewDate)}</td>
                  <td className="text-right">
                    <span className="badge bg-light-blue">{row.reviewCount}</span>
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
