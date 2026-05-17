import Link from "next/link";

import LeadBoxViewAllLink from "@/app/admin/leads/LeadBoxViewAllLink";
import LeadProductTableCell from "@/app/admin/leads/LeadProductTableCell";
import {
  formatLeadDate,
  formatInr,
  highIntentBadge,
  leadModuleRoutes,
} from "@/app/admin/leads/format";
import type { LeadProductStatWithProduct } from "@/lib/admin/lead";

type Props = Readonly<{
  rows: LeadProductStatWithProduct[];
}>;

export default function LeadUserProductStatsTable({ rows }: Props) {
  return (
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">Product review stats</h3>
        <div className="box-tools pull-right">
          <span className="badge bg-light-blue" style={{ marginTop: 3 }}>
            {rows.length} product{rows.length === 1 ? "" : "s"}
          </span>
          <Link
            href={leadModuleRoutes.productStats}
            className="btn btn-box-tool"
            title="All product stats"
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
              <th className="text-right">Price</th>
              <th className="text-center">Status</th>
              <th className="text-center">Reviews</th>
              <th className="text-center">Days</th>
              <th>First review</th>
              <th>Last review</th>
              <th className="text-center">High intent</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted">
                  No per-product stats for this user.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => {
                const intent = highIntentBadge(row.isHighIntent);
                const p = row.product;
                return (
                  <tr key={row.id}>
                    <td>{idx + 1}.</td>
                    <td style={{ minWidth: 200 }}>
                      <LeadProductTableCell product={p} />
                    </td>
                    <td className="text-right">{formatInr(p.price)}</td>
                    <td className="text-center">
                      <span
                        className={`label ${
                          p.status.toUpperCase() === "ACTIVE"
                            ? "label-success"
                            : "label-default"
                        }`}
                      >
                        {p.status}
                      </span>
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
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <LeadBoxViewAllLink
        href={leadModuleRoutes.productStats}
        label="View all product stats"
      />
    </div>
  );
}
