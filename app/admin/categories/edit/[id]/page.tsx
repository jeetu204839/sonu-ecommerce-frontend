import Link from "next/link";
import { notFound } from "next/navigation";

import EditCategoryForm from "@/app/admin/categories/edit/[id]/EditCategoryForm";
import {
  buildParentDropdownForCategoryEdit,
  fetchAdminCategoryById,
  fetchAdminCategoryParentPickList,
} from "@/lib/admin/category";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function CategoryEditPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const id = Number.parseInt(rawId, 10);
  if (!Number.isFinite(id) || id <= 0) {
    notFound();
  }

  const [detailResult, parentsResult] = await Promise.all([
    fetchAdminCategoryById(id),
    fetchAdminCategoryParentPickList(),
  ]);

  const leafParentOptions =
    parentsResult.ok ? parentsResult.options.filter((p) => p.id !== id) : [];

  const parentsLoadWarning = parentsResult.ok
    ? undefined
    : parentsResult.message;

  const parentDropdown =
    detailResult.ok
      ? await buildParentDropdownForCategoryEdit(id, detailResult.data, leafParentOptions)
      : { options: leafParentOptions, selectedParentId: null as number | null };

  const parentOptions = parentDropdown.options;
  const selectedParentId = parentDropdown.selectedParentId;

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
          <li className="active">Edit</li>
        </ol>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-8">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Edit category</h3>
                <div className="box-tools pull-right">
                  <Link
                    href="/admin/categories"
                    className="btn btn-default btn-sm"
                  >
                    Back to list
                  </Link>
                </div>
              </div>

              {detailResult.ok ? (
                <>
                  <EditCategoryForm
                    initial={{
                      id: detailResult.data.id,
                      name: detailResult.data.name,
                      slug: detailResult.data.slug,
                      status: detailResult.data.status,
                      description: detailResult.data.description,
                      metaTitle: detailResult.data.metaTitle,
                      metaDesc: detailResult.data.metaDesc,
                      imageUrl: detailResult.data.image,
                      parentId: selectedParentId,
                    }}
                    parentOptions={parentOptions}
                    parentsLoadWarning={parentsLoadWarning}
                  />

                  {detailResult.data.children &&
                  detailResult.data.children.length > 0 ? (
                    <div className="box-footer">
                      <p className="text-bold" style={{ marginBottom: 8 }}>
                        <strong>Child categories</strong>
                      </p>
                      <ul className="list-unstyled" style={{ marginBottom: 0 }}>
                        {detailResult.data.children.map((child) => (
                          <li key={child.id}>
                            <Link href={`/admin/categories/edit/${child.id}`}>
                              {child.name}
                            </Link>{" "}
                            <small className="text-muted">({child.slug})</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="box-body">
                  <div className="alert alert-danger" role="alert">
                    {detailResult.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
