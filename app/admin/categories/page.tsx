import Link from "next/link";
import Pagination from "@/app/admin/component/common/Pagination";

export default function Categories() {
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
                        <h3 className="box-title">Attributes</h3>
                        <div className="box-tools pull-right">
                            <Link
                                href="/admin/attributes/create"
                                className="btn btn-primary btn-sm"
                            >
                                <i className="fa fa-plus" /> Add attribute
                            </Link>
                        </div>
                    </div>

                    <div className="box-body no-padding">
                        <table className="table table-condensed table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: 48 }}>#</th>
                                    <th>Attribute name</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                    <th style={{ width: 140 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={1}>
                                    <td>{1}.</td>
                                    <td>name</td>
                                    <td>created_at</td>
                                    <td>updated_at</td>
                                    <td>
                                        <Link href={`/admin/attributes/edit/${1}`} className="btn btn-default btn-sm" title="Edit" >
                                            <i className="fa fa-edit" />
                                        </Link>
                                        &nbsp;|&nbsp;
                                        <button type="button" className="btn btn-danger btn-sm" title="Delete"  >
                                            <i className="fa fa-trash-o" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        currentPage={1}
                        totalPages={50}
                        totalCount={500}
                        perPage={10}
                        shownCount={10}
                        previousPage={2}
                        nextPage={5}
                        hrefForPage={(p) => `/admin/categories?page=${p}`}
                        maxNumericLinks={7}
                    />

                </div>
            </div>

        </>
    );
}
