import Link from "next/link";

import Pagination from "@/app/admin/component/common/Pagination";
import LeadModuleToolbar from "@/app/admin/leads/LeadModuleToolbar";
import {
  displayUserName,
  formatLeadDate,
  formatLeadDateTime,
  formatUserPhone,
  leadProductReviewDetailHref,
  leadUserDetailHref,
} from "@/app/admin/leads/format";
import { fetchLeadDailyReviewsPage } from "@/lib/admin/lead";
import { resolveProductImageUrl } from "@/lib/api/products";

type PageProps = Readonly<{
  searchParams: Promise<{ page?: string }>;
}>;

export default async function LeadDailyReviewsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const result = await fetchLeadDailyReviewsPage(page);

  if (!result.ok) {
    return (
      <>
        <section className="content-header">
          <h1>
            Daily reviews <small>Leads</small>
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
            <li className="active">Daily reviews</li>
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

  const { reviews, pagination } = result.data;
  const rowOffset = (pagination.current_page - 1) * pagination.per_page;

  return (
    <>
      <section className="content-header">
        <h1>
          Daily reviews <small>Leads</small>
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
          <li className="active">Daily reviews</li>
        </ol>
      </section>

      <div className="content">
        <LeadModuleToolbar active="daily" />
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Daily product reviews</h3>
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
                  <th>Review date</th>
                  <th className="text-center">Count</th>
                  <th>Source</th>
                  <th>Last reviewed</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center text-muted">
                      No daily reviews on this page.
                    </td>
                  </tr>
                ) : (
                  reviews.map((row, index) => {
                    const p = row.product;
                    const u = row.user;
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
                        <td>{formatLeadDate(row.reviewDate)}</td>
                        <td className="text-center">
                          <span className="badge bg-light-blue">
                            {row.reviewCount}
                          </span>
                        </td>
                        <td>
                          <span className="label label-default">
                            {row.source}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {formatLeadDateTime(row.lastReviewedAt)}
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
            shownCount={reviews.length}
            previousPage={pagination.previous_page}
            nextPage={pagination.next_page}
            hrefForPage={(p) => `/admin/leads/daily?page=${p}`}
            maxNumericLinks={7}
          />
        </div>
      </div>
    </>
  );
}
