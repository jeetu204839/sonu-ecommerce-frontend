import Link from "next/link";

import Pagination from "@/app/admin/component/common/Pagination";
import LeadModuleToolbar from "@/app/admin/leads/LeadModuleToolbar";
import {
  displayUserName,
  formatLeadDate,
  formatLeadDateTime,
  formatUserPhone,
  leadTierDisplayLabel,
  leadTierLabelClass,
  leadUserDetailHref,
} from "@/app/admin/leads/format";
import { fetchLeadLeadsPage } from "@/lib/admin/lead";

type PageProps = Readonly<{
  searchParams: Promise<{ page?: string }>;
}>;

export default async function LeadLeadsListPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const result = await fetchLeadLeadsPage(page);

  if (!result.ok) {
    return (
      <>
        <section className="content-header">
          <h1>
            Scored leads <small>Leads</small>
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
            <li className="active">Scored leads</li>
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

  const { leads, pagination } = result.data;
  const rowOffset = (pagination.current_page - 1) * pagination.per_page;

  return (
    <>
      <section className="content-header">
        <h1>
          Scored leads <small>Leads</small>
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
          <li className="active">Scored leads</li>
        </ol>
      </section>

      <div className="content">
        <LeadModuleToolbar active="scoredLeads" />
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Lead scores &amp; tiers</h3>
          </div>

          <div className="box-body no-padding">
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  <th>Contact</th>
                  <th className="text-center">Tier</th>
                  <th className="text-right">Score</th>
                  <th className="text-right">Reviews</th>
                  <th className="text-right">Products</th>
                  <th className="text-right">Days</th>
                  <th>Last review</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Notes</th>
                  <th style={{ width: 90 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center text-muted">
                      No leads on this page.
                    </td>
                  </tr>
                ) : (
                  leads.map((row, index) => {
                    const u = row.user;
                    const phone = formatUserPhone(u.phoneNumber, u.countryCode);
                    return (
                      <tr key={row.id}>
                        <td>{rowOffset + index + 1}.</td>
                        <td>
                          <strong>
                            <Link href={leadUserDetailHref(u.id)}>
                              {displayUserName(u.name, u.phoneNumber, u.email)}
                            </Link>
                          </strong>
                          <br />
                          <span className="text-muted small">{phone}</span>
                          {u.email?.trim() ? (
                            <>
                              <br />
                              <span className="text-muted small">{u.email}</span>
                            </>
                          ) : null}
                          {!u.isActive ? (
                            <>
                              <br />
                              <span className="label label-warning">Inactive</span>
                            </>
                          ) : null}
                        </td>
                        <td className="text-center">
                          <span
                            className={`label ${leadTierLabelClass(row.leadTier)}`}
                          >
                            {leadTierDisplayLabel(row.leadTier)}
                          </span>
                        </td>
                        <td className="text-right">
                          <strong>{row.leadScore}</strong>
                        </td>
                        <td className="text-right">{row.totalReviewCount}</td>
                        <td className="text-right">
                          {row.uniqueProductsReviewed}
                        </td>
                        <td className="text-right">{row.distinctReviewDays}</td>
                        <td>{formatLeadDate(row.lastReviewDate)}</td>
                        <td className="text-muted small">
                          {formatLeadDateTime(row.createdAt)}
                        </td>
                        <td className="text-muted small">
                          {formatLeadDateTime(row.updatedAt)}
                        </td>
                        <td className="text-muted small">
                          {row.notes?.trim() ? row.notes : "—"}
                        </td>
                        <td>
                          <Link
                            href={leadUserDetailHref(u.id)}
                            className="btn btn-default btn-sm"
                            title="View lead detail"
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

          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            totalCount={pagination.total_count}
            perPage={pagination.per_page}
            shownCount={leads.length}
            previousPage={pagination.previous_page}
            nextPage={pagination.next_page}
            hrefForPage={(p) => `/admin/leads/leads?page=${p}`}
            maxNumericLinks={7}
          />
        </div>
      </div>
    </>
  );
}
