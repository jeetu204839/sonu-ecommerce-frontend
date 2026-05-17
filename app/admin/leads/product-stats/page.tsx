import Link from "next/link";

import Pagination from "@/app/admin/component/common/Pagination";
import LeadModuleToolbar from "@/app/admin/leads/LeadModuleToolbar";
import {
  displayUserName,
  formatLeadDate,
  formatUserPhone,
  highIntentBadge,
  leadProductReviewDetailHref,
  leadUserDetailHref,
} from "@/app/admin/leads/format";
import { fetchLeadProductStatsPage } from "@/lib/admin/lead";
import { resolveProductImageUrl } from "@/lib/api/products";

type PageProps = Readonly<{
  searchParams: Promise<{ page?: string }>;
}>;

export default async function LeadProductStatsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const result = await fetchLeadProductStatsPage(page);

  if (!result.ok) {
    return (
      <>
        <section className="content-header">
          <h1>
            Product stats <small>Leads</small>
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
            <li className="active">Product stats</li>
          </ol>
        </section>
        <div className="content">
          <div className="alert alert-warning" role="alert">
            {result.message}
            {result.unauthorized ? (
              <>
                {" "}
                <Link href="/auth/login">Sign in</Link>
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  }

  const { stats, pagination } = result.data;
  const rowOffset = (pagination.current_page - 1) * pagination.per_page;

  return (
    <>
      <section className="content-header">
        <h1>
          Product stats <small>Leads</small>
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
          <li className="active">Product stats</li>
        </ol>
      </section>

      <div className="content">
        <LeadModuleToolbar active="productStats" />
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">User–product review stats</h3>
          </div>

          <div className="box-body no-padding">
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  <th style={{ width: 64 }}>Image</th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>User</th>
                  <th>Phone</th>
                  <th className="text-center">Reviews</th>
                  <th className="text-center">Days</th>
                  <th>First review</th>
                  <th>Last review</th>
                  <th className="text-center">High intent</th>
                </tr>
              </thead>
              <tbody>
                {stats.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center text-muted">
                      No product stats on this page.
                    </td>
                  </tr>
                ) : (
                  stats.map((row, index) => {
                    const p = row.product;
                    const u = row.user;
                    const intent = highIntentBadge(row.isHighIntent);
                    const img = p.imageUrl?.trim()
                      ? p.imageUrl.trim()
                      : resolveProductImageUrl(null);
                    return (
                      <tr key={row.id}>
                        <td>{rowOffset + index + 1}.</td>
                        <td>
                          <Link
                            href={leadProductReviewDetailHref(p.id)}
                            title={p.name}
                          >
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
                        </td>
                        <td className="text-muted small">{p.sku}</td>
                        <td>
                          <Link href={leadUserDetailHref(u.id)}>
                            {displayUserName(u.name, u.phoneNumber, u.email)}
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
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            totalCount={pagination.total_count}
            perPage={pagination.per_page}
            shownCount={stats.length}
            previousPage={pagination.previous_page}
            nextPage={pagination.next_page}
            hrefForPage={(p) => `/admin/leads/product-stats?page=${p}`}
            maxNumericLinks={7}
          />
        </div>
      </div>
    </>
  );
}
