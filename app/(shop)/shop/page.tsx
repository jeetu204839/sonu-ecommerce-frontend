import Link from "next/link";
import Categories from "../component/Categories";
import { fetchProductsPage } from "@/lib/api/products";
import ShopProductGrid from "./ShopProductGrid";

type PageProps = Readonly<{
  searchParams: Promise<{ page?: string; category?: string }>;
}>;

export default async function ShopPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const pageRaw = Number.parseInt(sp.page ?? "1", 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const categorySlug = sp.category?.trim() || undefined;

  let products: Awaited<ReturnType<typeof fetchProductsPage>>["products"] = [];
  let pagination: Awaited<
    ReturnType<typeof fetchProductsPage>
  >["pagination"] = null;
  let message = "";

  try {
    const result = await fetchProductsPage({ page, categorySlug });
    products = result.products;
    pagination = result.pagination;
    message = result.message;
  } catch (e) {
    message =
      e instanceof Error
        ? e.message
        : "Unable to reach the product API. Check API_BASE_URL and that the backend is running.";
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="#">Pages</Link>
          </li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>

      <div className="container-fluid fruite py-3">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <Categories />

                <ShopProductGrid
                  products={products}
                  pagination={pagination}
                  message={message}
                  categorySlug={categorySlug}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
