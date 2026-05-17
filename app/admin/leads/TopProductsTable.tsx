import Link from "next/link";

import type { LeadTopProductRow } from "@/lib/admin/lead";
import { resolveProductImageUrl } from "@/lib/api/products";

import LeadBoxViewAllLink from "./LeadBoxViewAllLink";
import {
  formatInr,
  leadModuleRoutes,
  leadProductReviewDetailHref,
} from "./format";

type Props = Readonly<{
  rows: LeadTopProductRow[];
}>;

export default function TopProductsTable({ rows }: Props) {
  return (
    <div className="box box-primary">
      <div className="box-header with-border">
        <h3 className="box-title">Top reviewed products</h3>
        <div className="box-tools pull-right">
          <Link
            href={leadModuleRoutes.productStats}
            className="btn btn-box-tool"
            title="View all product stats"
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
              <th style={{ width: 64 }}>Image</th>
              <th>Product</th>
              <th>SKU</th>
              <th className="text-right">Price</th>
              <th className="text-center">Status</th>
              <th className="text-right">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted">
                  No product review data yet.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => {
                const p = row.product;
                const img = p.imageUrl?.trim()
                  ? p.imageUrl.trim()
                  : resolveProductImageUrl(null);
                return (
                  <tr key={`${row.productId}-${idx}`}>
                    <td>{idx + 1}</td>
                    <td>
                      <Link href={leadProductReviewDetailHref(p.id)} title={p.name}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt=""
                          width={48}
                          height={48}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={leadProductReviewDetailHref(p.id)}
                        className="text-dark"
                      >
                        <strong>{p.name}</strong>
                      </Link>
                      <br />
                      <span className="text-muted small">{p.slug}</span>
                    </td>
                    <td className="text-muted small">{p.sku}</td>
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
                    <td className="text-right">
                      <span className="badge bg-light-blue">
                        {row.totalReviewCount}
                      </span>
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
