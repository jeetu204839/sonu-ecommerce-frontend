import Link from "next/link";
import { notFound } from "next/navigation";

import ProductDetailsView from "@/app/admin/products/details/[id]/ProductDetailsView";
import ProductImageUploadForm from "@/app/admin/products/details/[id]/ProductImageUploadForm";
import { fetchAdminProductById } from "@/lib/admin/product";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id: idParam } = await params;
  const productId = Number.parseInt(idParam, 10);
  if (!Number.isFinite(productId) || productId < 1) {
    notFound();
  }

  const result = await fetchAdminProductById(productId);
  if (!result.ok) {
    if (result.unauthorized) {
      return (
        <section className="content">
          <div className="alert alert-warning" role="alert">
            {result.message}
          </div>
        </section>
      );
    }
    notFound();
  }

  return (
    <>
      <section className="content-header">
        <h1>
          Products <small>Details</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/products">
              <i className="fa fa-dashboard" /> Products
            </Link>
          </li>
          <li className="active">Details #{productId}</li>
        </ol>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-8">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Product details</h3>
              </div>
              <ProductDetailsView product={result.data} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="box box-info">
              <div className="box-header with-border">
                <h3 className="box-title">Upload image</h3>
              </div>
              <ProductImageUploadForm productId={productId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
