import Link from "next/link";

import { fetchAdminAttributesPage } from "@/lib/admin/attributes";
import Pagination from "@/app/admin/component/common/Pagination";

type PageProps = Readonly<{
  searchParams: Promise<{ page?: string }>;
}>;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default async function Attributes({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const result = await fetchAdminAttributesPage(page);

  if (!result.ok) {
    return (
      <>
        <section className="content-header">
          <h1>
            Attributes <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link href="/admin/dashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">Attributes</li>
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

  const { attributes, pagination } = result.data;
  const rowOffset = (pagination.current_page - 1) * pagination.per_page;

  return (
    <>
      <section className="content-header">
        <h1>
          Attributes <small>Control panel</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/dashboard">
              <i className="fa fa-dashboard" /> Home
            </Link>
          </li>
          <li className="active">Attributes</li>
        </ol>
      </section>

      

      <div className="content">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Attributes</h3>
            <div className="box-tools pull-right">
              <Link
                href="/admin/attributes/create"
                className="btn btn-primary btn-sm"
              >
                <i className="fa fa-plus" /> Add attribute
              </Link>
            </div>
          </div>

          <div className="box-body no-padding">
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  <th>Attribute name</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attributes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No attributes on this page.
                    </td>
                  </tr>
                ) : (
                  attributes.map((attr, index) => (
                    <tr key={attr.id}>
                      <td>{rowOffset + index + 1}.</td>
                      <td>{attr.name}</td>
                      <td>{formatDate(attr.createdAt)}</td>
                      <td>{formatDate(attr.updatedAt)}</td>
                      <td>
                        <Link href={`/admin/attributes/edit/${attr.id}`} className="btn btn-default btn-sm" title="Edit" >
                          <i className="fa fa-edit" />
                        </Link>
                        &nbsp;|&nbsp;
                        <button type="button" className="btn btn-danger btn-sm" title="Delete"  >
                          <i className="fa fa-trash-o" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            totalCount={pagination.total_count}
            perPage={pagination.per_page}
            shownCount={attributes.length}
            previousPage={pagination.previous_page}
            nextPage={pagination.next_page}
            hrefForPage={(p) => `/admin/attributes?page=${p}`}
            maxNumericLinks={7}
          />

        </div>
      </div>
    </>
  );
}
