import Link from "next/link";

import { leadProductReviewDetailHref } from "@/app/admin/leads/format";
import type { LeadTopProductSummary } from "@/lib/admin/lead";
import { resolveProductImageUrl } from "@/lib/api/products";

type Props = Readonly<{
  product: LeadTopProductSummary;
}>;

export default function LeadProductTableCell({ product }: Props) {
  const img = product.imageUrl?.trim()
    ? product.imageUrl.trim()
    : resolveProductImageUrl(null);

  return (
    <div className="clearfix">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        width={44}
        height={44}
        className="pull-left"
        style={{ objectFit: "cover", borderRadius: 4, marginRight: 10 }}
      />
      <Link href={leadProductReviewDetailHref(product.id)} className="text-dark">
        <strong>{product.name}</strong>
      </Link>
      <br />
      <span className="text-muted small">{product.sku}</span>
    </div>
  );
}
