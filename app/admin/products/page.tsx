import Link from "next/link";

import Pagination from "@/app/admin/component/common/Pagination";
import ProductListTable from "@/app/admin/products/ProductListTable";
import ProductSearchBar from "@/app/admin/products/ProductSearchBar";
import { fetchAdminProductsPage } from "@/lib/admin/product";

type PageProps = Readonly<{
  searchParams: Promise<{ page?: string; search?: string; serch?: string }>;
}>;

function hrefForProductsPage(page: number, searchTerm: string): string {
  const q = new URLSearchParams();
  q.set("page", String(page));
  const term = searchTerm.trim();
  if (term) q.set("search", term);
  return `/admin/products?${q.toString()}`;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const searchTerm =
    sp.search?.trim() || sp.serch?.trim() || "";

  const result = await fetchAdminProductsPage(page, {
    search: searchTerm || undefined,
  });

  if (!result.ok) {
    return (
      <>
        <section className="content-header">
          <h1>
            Products{" "}
            <small>catalog overview</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link href="/admin/dashboard">
                <i className="fa fa-dashboard" /> Home
              </Link>
            </li>
            <li className="active">Products</li>
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

  const { products, pagination } = result.data;
  const rowOffset = (pagination.current_page - 1) * pagination.per_page;

  return (
    <>
      <section className="content-header">
        <h1>
          Products{" "}
          <small>catalog overview</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/dashboard">
              <i className="fa fa-dashboard" /> Home
            </Link>
          </li>
          <li className="active">Products</li>
        </ol>
      </section>

      <div className="content">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">All products</h3>
            <div className="box-tools pull-right">
              <ProductSearchBar defaultQuery={searchTerm} />
              <Link
                href="/admin/products/create"
                className="btn btn-primary btn-sm"
                style={{ marginLeft: 8 }}
              >
                <i className="fa fa-plus" /> Add product
              </Link>
            </div>
          </div>

          <div className="box-body table-responsive no-padding">
            <table className="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  <th style={{ width: 56 }}>Image</th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Vendor</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Off %</th>
                  <th>Qty</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th style={{ width: 72 }}>Actions</th>
                </tr>
              </thead>
              <ProductListTable products={products} rowOffset={rowOffset} />
            </table>
          </div>

          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            totalCount={pagination.total_count}
            perPage={pagination.per_page}
            shownCount={products.length}
            previousPage={pagination.previous_page}
            nextPage={pagination.next_page}
            hrefForPage={(p) => hrefForProductsPage(p, searchTerm)}
            maxNumericLinks={7}
          />
        </div>
      </div>
    </>
  );
}
