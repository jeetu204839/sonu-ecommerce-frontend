import Link from "next/link";

import CreateCategoryForm from "@/app/admin/categories/create/CreateCategoryForm";
import { fetchAdminCategoryParentPickList } from "@/lib/admin/category";

export default async function CreateCategoryPage() {
  const parentsResult = await fetchAdminCategoryParentPickList();
  const parentOptions = parentsResult.ok ? parentsResult.options : [];
  const parentsLoadWarning = parentsResult.ok
    ? undefined
    : parentsResult.message;

  return (
    <>
      <section className="content-header">
        <h1>
          Categories <small>Control panel</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/categories">
              <i className="fa fa-dashboard" /> Categories
            </Link>
          </li>
          <li className="active">Create</li>
        </ol>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-8">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Create category</h3>
              </div>

              <CreateCategoryForm
                parentOptions={parentOptions}
                parentsLoadWarning={parentsLoadWarning}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
