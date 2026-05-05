import Link from "next/link";

import CreateAttributeForm from "@/app/admin/attributes/create/CreateAttributeForm";

export default function Create() {
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
          <li className="active">Create</li>
        </ol>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-6">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">Create Attribute</h3>
              </div>

              <CreateAttributeForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
