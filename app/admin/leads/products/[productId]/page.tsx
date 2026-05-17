import Link from "next/link";
import { notFound } from "next/navigation";

import LeadModuleToolbar from "@/app/admin/leads/LeadModuleToolbar";
import { leadModuleRoutes } from "@/app/admin/leads/format";
import { fetchLeadProductReviewDetail } from "@/lib/admin/lead";

import LeadProductReviewDetailView from "./LeadProductReviewDetailView";

type PageProps = Readonly<{
  params: Promise<{ productId: string }>;
}>;

export default async function LeadProductReviewDetailPage({
  params,
}: PageProps) {
  const { productId: productIdParam } = await params;
  const productId = Number.parseInt(productIdParam, 10);
  if (!Number.isFinite(productId) || productId < 1) {
    notFound();
  }

  const result = await fetchLeadProductReviewDetail(productId);

  if (!result.ok) {
    if (result.unauthorized) {
      return (
        <>
          <section className="content-header">
            <h1>
              Product reviews <small>Leads</small>
            </h1>
          </section>
          <section className="content">
            <div className="alert alert-warning" role="alert">
              {result.message}{" "}
              <Link href="/auth/login">Sign in</Link>
            </div>
          </section>
        </>
      );
    }
    notFound();
  }

  const { product } = result.data;

  return (
    <>
      <section className="content-header">
        <h1>
          Product reviews <small>{product.name}</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/dashboard">
              <i className="fa fa-dashboard" /> Home
            </Link>
          </li>
          <li>
            <Link href="/admin/leads">Leads</Link>
          </li>
          <li>
            <Link href={leadModuleRoutes.productStats}>Product stats</Link>
          </li>
          <li className="active">{product.name}</li>
        </ol>
      </section>

      <section className="content">
        <LeadModuleToolbar />
        <p className="mb-3">
          <Link
            href={leadModuleRoutes.productStats}
            className="btn btn-default btn-sm"
            style={{ marginRight: 8 }}
          >
            <i className="fa fa-arrow-left" /> Back to product stats
          </Link>
          <Link href={leadModuleRoutes.dashboard} className="btn btn-default btn-sm">
            <i className="fa fa-line-chart" /> Leads dashboard
          </Link>
        </p>
        <LeadProductReviewDetailView data={result.data} />
      </section>
    </>
  );
}
