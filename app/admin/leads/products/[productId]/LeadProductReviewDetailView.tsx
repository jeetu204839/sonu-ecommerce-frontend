import Link from "next/link";
import type { ReactNode } from "react";

import {
  formatInr,
  formatLeadDate,
} from "@/app/admin/leads/format";
import type { LeadProductReviewDetailData } from "@/lib/admin/lead";
import { resolveProductImageUrl } from "@/lib/api/products";

import LeadProductDailyTrendTable from "./LeadProductDailyTrendTable";
import LeadProductTopReviewersTable from "./LeadProductTopReviewersTable";

type Props = Readonly<{
  data: LeadProductReviewDetailData;
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

function SummaryMetric({
  value,
  label,
}: Readonly<{ value: number; label: string }>) {
  return (
    <div className="col-xs-12 col-sm-4">
      <div className="lead-detail-metric">
        <div className="lead-detail-metric-value">{value}</div>
        <div className="text-muted small">{label}</div>
      </div>
    </div>
  );
}

export default function LeadProductReviewDetailView({ data }: Props) {
  const { product, summary, topReviewers, dailyTrend } = data;
  const img = product.imageUrl?.trim()
    ? product.imageUrl.trim()
    : resolveProductImageUrl(null);

  return (
    <>
      <div className="row">
        <div className="col-md-5">
          <div className="box box-solid">
            <div className="box-header with-border">
              <h3 className="box-title">
                <i className="fa fa-cube margin-r-5" />
                Product
              </h3>
            </div>
            <div className="box-body text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: 200,
                  objectFit: "contain",
                  marginBottom: 16,
                  borderRadius: 4,
                }}
              />
              <h4 className="text-primary" style={{ marginTop: 0 }}>
                {product.name}
              </h4>
              <p className="text-muted small">{product.slug}</p>
              <Link
                href={`/admin/products/details/${product.id}`}
                className="btn btn-default btn-sm"
              >
                <i className="fa fa-external-link" /> Catalog details
              </Link>
            </div>
            <div className="box-footer">
              <dl className="dl-horizontal lead-detail-dl mb-0">
                <DefinitionRow label="Product ID">{product.id}</DefinitionRow>
                <DefinitionRow label="SKU">{product.sku}</DefinitionRow>
                <DefinitionRow label="Price">{formatInr(product.price)}</DefinitionRow>
                <DefinitionRow label="MRP">{formatInr(product.mrp)}</DefinitionRow>
                <DefinitionRow label="Status">
                  <span
                    className={`label ${
                      product.status.toUpperCase() === "ACTIVE"
                        ? "label-success"
                        : "label-default"
                    }`}
                  >
                    {product.status}
                  </span>
                </DefinitionRow>
                <DefinitionRow label="Category">
                  {product.category.name}
                  <span className="text-muted small">
                    {" "}
                    ({product.category.slug})
                  </span>
                </DefinitionRow>
                <DefinitionRow label="Vendor">
                  {product.vendor.storeName}
                  <span className="text-muted small">
                    {" "}
                    ({product.vendor.storeSlug})
                  </span>
                </DefinitionRow>
              </dl>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="box box-info">
            <div className="box-header with-border">
              <h3 className="box-title">
                <i className="fa fa-bar-chart margin-r-5" />
                Review summary
              </h3>
            </div>
            <div className="box-body">
              <div className="row text-center">
                <SummaryMetric
                  value={summary.uniqueReviewers}
                  label="Unique reviewers"
                />
                <SummaryMetric
                  value={summary.totalReviewEvents}
                  label="Total review events"
                />
                <SummaryMetric
                  value={summary.highIntentReviewers}
                  label="High-intent reviewers"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7">
          <LeadProductTopReviewersTable rows={topReviewers} />
        </div>
        <div className="col-md-5">
          <LeadProductDailyTrendTable rows={dailyTrend} />
        </div>
      </div>
    </>
  );
}
