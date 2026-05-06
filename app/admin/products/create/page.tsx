
export default function CreateProductPage() {
    return (
        <>
            <section className="content-header">
                <h1>
                    General Form Elements
                    <small>Preview</small>
                </h1>
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <i className="fa fa-dashboard" /> Home
                        </a>
                    </li>
                    <li>
                        <a href="#">Forms</a>
                    </li>
                    <li className="active">General Elements</li>
                </ol>
            </section>

            <section className="content">
                <div className="box box-primary">
                    <div className="box-header">
                        <h3 className="box-title">Quick Example</h3>
                    </div>

                    <form role="form">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                </div>
                            </div>



                        </div>

                        <div className="box-footer">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}