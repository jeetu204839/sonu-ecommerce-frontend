import Link from "next/link";

import CategoryListTable from "@/app/admin/categories/CategoryListTable";
import Pagination from "@/app/admin/component/common/Pagination";
import { fetchAdminCategoriesPage } from "@/lib/admin/category";

type PageProps = Readonly<{
  searchParams: Promise<{ page?: string }>;
}>;

export default async function CategoriesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const result = await fetchAdminCategoriesPage(page);

  if (!result.ok) {
    return (
      <>
        <section className="content-header">
          <h1>
            Categories <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link href="/admin/dashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">Categories</li>
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

  const { categories, pagination } = result.data;
  const rowOffset = (pagination.current_page - 1) * pagination.per_page;

  return (
    <>
      <section className="content-header">
        <h1>
          Categories <small>Control panel</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/dashboard">
              <i className="fa fa-dashboard" /> Home
            </Link>
          </li>
          <li className="active">Categories</li>
        </ol>
      </section>

      <div className="content">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Categories</h3>
            <div className="box-tools pull-right">
              <Link
                href="/admin/categories/create"
                className="btn btn-primary btn-sm"
              >
                <i className="fa fa-plus" /> Add category
              </Link>
            </div>
          </div>

          <div className="box-body no-padding">
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  <th style={{ width: 64 }}>Image</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th style={{ width: 90 }}>Products</th>
                  <th>Created at</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <CategoryListTable
                categories={categories}
                rowOffset={rowOffset}
              />
            </table>
          </div>

          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            totalCount={pagination.total_count}
            perPage={pagination.per_page}
            shownCount={categories.length}
            previousPage={pagination.previous_page}
            nextPage={pagination.next_page}
            hrefForPage={(p) => `/admin/categories?page=${p}`}
            maxNumericLinks={7}
          />
        </div>
      </div>
    </>
  );
}
