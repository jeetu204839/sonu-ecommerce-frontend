import Link from "next/link";

import ProductCreateForm from "@/app/admin/products/create/ProductCreateForm";
import { fetchAdminAttributesAll } from "@/lib/admin/attribute";
import { fetchAdminCategoryParentPickList } from "@/lib/admin/category";

export default async function CreateProductPage() {
  const [categoriesResult, attributesResult] = await Promise.all([
    fetchAdminCategoryParentPickList(),
    fetchAdminAttributesAll(),
  ]);

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
          Products{" "}
          <small>Create</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/products">
              <i className="fa fa-dashboard" /> Products
            </Link>
          </li>
          <li className="active">Create</li>
        </ol>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Create product</h3>
              </div>

              <ProductCreateForm
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
