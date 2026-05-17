import Link from "next/link";
import { notFound } from "next/navigation";

import LeadModuleToolbar from "@/app/admin/leads/LeadModuleToolbar";
import {
  displayUserName,
  formatUserPhone,
} from "@/app/admin/leads/format";
import { fetchLeadUserDetail } from "@/lib/admin/lead";

import LeadUserDetailView from "./LeadUserDetailView";

type PageProps = Readonly<{
  params: Promise<{ userId: string }>;
}>;

export default async function LeadUserDetailPage({ params }: PageProps) {
  const { userId: userIdParam } = await params;
  const userId = Number.parseInt(userIdParam, 10);
  if (!Number.isFinite(userId) || userId < 1) {
    notFound();
  }

  const result = await fetchLeadUserDetail(userId);

  if (!result.ok) {
    if (result.unauthorized) {
      return (
        <>
          <section className="content-header">
            <h1>
              Lead detail <small>Leads</small>
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

  const { user } = result.data;
  const title = displayUserName(user.name, user.phoneNumber, user.email);
  const phone = formatUserPhone(user.phoneNumber, user.countryCode);

  return (
    <>
      <section className="content-header">
        <h1>
          Lead detail <small>{phone}</small>
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
            <Link href="/admin/leads/leads">Scored leads</Link>
          </li>
          <li className="active">{title}</li>
        </ol>
      </section>

      <section className="content">
        <LeadModuleToolbar />
        <p className="mb-3">
          <Link href="/admin/leads/leads" className="btn btn-default btn-sm">
            <i className="fa fa-arrow-left" /> Back to scored leads
          </Link>
        </p>
        <LeadUserDetailView data={result.data} />
      </section>
    </>
  );
}
