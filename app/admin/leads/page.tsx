import Link from "next/link";

import LeadKpiCards from "@/app/admin/leads/LeadKpiCards";
import LeadModuleToolbar from "@/app/admin/leads/LeadModuleToolbar";
import RecentHotLeadsTable from "@/app/admin/leads/RecentHotLeadsTable";
import TopProductsTable from "@/app/admin/leads/TopProductsTable";
import { fetchLeadReviewDashboard } from "@/lib/admin/lead";

export default async function LeadsPage() {
  const result = await fetchLeadReviewDashboard();

  if (!result.ok) {
    return (
      <>
        <section className="content-header">
          <h1>
            Leads <small>Review dashboard</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link href="/admin/dashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">Leads</li>
          </ol>
        </section>
        <section className="content">
          <div className="alert alert-warning" role="alert">
            {result.message}
            {result.unauthorized ? (
              <>
                {" "}
                <Link href="/auth/login">Sign in</Link>
              </>
            ) : null}
          </div>
        </section>
      </>
    );
  }

  const { kpi, topProducts, recentHotLeads } = result.data;

  return (
    <>
      <section className="content-header">
        <h1>
          Leads <small>Review dashboard</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/dashboard">
              <i className="fa fa-dashboard" /> Home
            </Link>
          </li>
          <li className="active">Leads</li>
        </ol>
      </section>

      <section className="content">
        <LeadModuleToolbar active="dashboard" />
        <LeadKpiCards kpi={kpi} />

        <div className="row">
          <section className="col-lg-7 connectedSortable">
            <TopProductsTable rows={topProducts} />
          </section>
          <section className="col-lg-5 connectedSortable">
            <RecentHotLeadsTable rows={recentHotLeads} />
          </section>
        </div>
      </section>
    </>
  );
}
