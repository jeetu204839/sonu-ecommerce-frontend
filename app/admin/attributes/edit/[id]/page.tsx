import Link from "next/link";
import { notFound } from "next/navigation";

import EditAttributeForm from "@/app/admin/attributes/edit/[id]/EditAttributeForm";
import { fetchAdminAttributeById } from "@/lib/admin/attribute";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function EditAttributePage({ params }: PageProps) {
  const { id: idParam } = await params;
  const id = Number.parseInt(idParam, 10);
  if (!Number.isFinite(id) || id <= 0) {
    notFound();
  }

  const result = await fetchAdminAttributeById(id);

  return (
    <>
      <section className="content-header">
        <h1>
          Attributes <small>Control panel</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link href="/admin/attributes">
              <i className="fa fa-dashboard" /> Attributes
            </Link>
          </li>
          <li className="active">Edit</li>
        </ol>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-6">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Edit Attribute</h3>
              </div>

              {result.ok ? (
                <EditAttributeForm id={result.data.id} initialName={result.data.name} />
              ) : (
                <div className="box-body">
                  <div className="alert alert-danger" role="alert">
                    {result.message}
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