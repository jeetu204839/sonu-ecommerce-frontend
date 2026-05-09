import Link from "next/link";
import { notFound } from "next/navigation";

import ProductEditForm from "@/app/admin/products/edit/[id]/ProductEditForm";
import { fetchAdminAttributesAll } from "@/lib/admin/attribute";
import { fetchAdminCategoryParentPickList } from "@/lib/admin/category";
import { fetchAdminProductById } from "@/lib/admin/product";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function EditProductPage({ params }: PageProps) {
  const { id: idParam } = await params;
  const productId = Number.parseInt(idParam, 10);
  if (!Number.isFinite(productId) || productId < 1) {
    notFound();
  }

  const [productResult, categoriesResult, attributesResult] = await Promise.all([
    fetchAdminProductById(productId),
    fetchAdminCategoryParentPickList(),
    fetchAdminAttributesAll(),
  ]);

  if (!productResult.ok) {
    if (productResult.unauthorized) {
      return (
        <section className="content">
          <div className="alert alert-warning" role="alert">
            {productResult.message}
          </div>
        </section>
      );
    }
    notFound();
  }

  const categoryOptions = categoriesResult.ok ? categoriesResult.options : [];
  const categoriesLoadWarning = categoriesResult.ok
    ? undefined
    : categoriesResult.message;

  const attributeOptions = attributesResult.ok ? attributesResult.attributes : [];
  const attributesLoadWarning = attributesResult.ok
    ? undefined
    : attributesResult.message;

  return (
    <>
      <section className="content-header">
        <h1>
          Products <small>Edit</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/products">
              <i className="fa fa-dashboard" /> Products
            </Link>
          </li>
          <li className="active">Edit #{productId}</li>
        </ol>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Edit product</h3>
              </div>

              <ProductEditForm
                productId={productId}
                initialProduct={productResult.data}
                categoryOptions={categoryOptions}
                attributeOptions={attributeOptions}
                categoriesLoadWarning={categoriesLoadWarning}
                attributesLoadWarning={attributesLoadWarning}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
