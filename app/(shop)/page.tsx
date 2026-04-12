
export default function Shop() {
  return (
    <>
     
      {/* Search Modal */}
      <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container-fluid hero-header">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              <h1 className="mb-5 display-3 text-primary">Premium Quality Cast Iron Products</h1>
              {/* <div className="position-relative mx-auto">
                <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search" />
                <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ top: '0', right: '25%' }}>Submit Now</button>
              </div> */}
            </div>
            <div className="col-md-12 col-lg-5">
              <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                <div className="carousel-inner" role="listbox">

                  <div className="carousel-item active rounded">
                    <img
                      src="/img/pipe-hooks.webp"
                      className="rounded bg-secondary"
                      alt="Pipe hooks"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                      Silver 4inch GI J Shape Pipe Hook
                    </a>
                  </div>

                  <div className="carousel-item rounded">
                    <img
                      src="/img/check-valve.webp"
                      className="rounded bg-secondary"
                      alt="Check valve"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                      Ci Check Valve handi
                    </a>
                  </div>

                  <div className="carousel-item rounded">
                    <img
                      src="/img/hose-nipple.webp"
                      className="rounded bg-secondary"
                      alt="Hose nipple"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                      Ci Hose Nipple
                    </a>
                  </div>

                  <div className="carousel-item rounded">
                    <img
                      src="/img/india-mark-2-hand-pump.webp"
                      className="rounded bg-secondary"
                      alt="Hand pump"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                      India Mark 2 Hand Pump
                    </a>
                  </div>

                  <div className="carousel-item rounded">
                    <img
                      src="/img/belcha-garden-square-hand.webp"
                      className="rounded bg-secondary"
                      alt="Garden belcha"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                     BELCHA Garden SQUARE Hand
                    </a>
                  </div>

                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Hero Section */}

      {/* Products Section */}
      <div className="container-fluid fruite py-5">
        <div className="container">
          <div className="tab-class text-center">
            
            <div className="row g-3 g-lg-4 align-items-lg-start">
              <div className="col-12 col-lg-4 text-start">
                <h1 className="mb-2 mb-lg-0">Premium Quality Cast Iron Products</h1>
              </div>
              <div className="col-12 col-lg-8 text-lg-end">
                <div className="shop-product-tabs-scroll">
                  <ul className="nav nav-pills d-flex flex-nowrap justify-content-lg-end gap-2 mb-3 mb-lg-5 pb-1">
                    <li className="nav-item flex-shrink-0">
                      <a
                        className="d-flex align-items-center justify-content-center px-3 py-1 py-lg-2 bg-light rounded-pill active"
                        data-bs-toggle="pill"
                        href="#tab-1"
                      >
                        <span className="text-dark text-nowrap shop-product-tab-label">All Products</span>
                      </a>
                    </li>
                    <li className="nav-item flex-shrink-0">
                      <a
                        className="d-flex align-items-center justify-content-center px-3 py-1 py-lg-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#tab-2"
                      >
                        <span className="text-dark text-nowrap shop-product-tab-label">Vegetables</span>
                      </a>
                    </li>
                    <li className="nav-item flex-shrink-0">
                      <a
                        className="d-flex align-items-center justify-content-center px-3 py-1 py-lg-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#tab-3"
                      >
                        <span className="text-dark text-nowrap shop-product-tab-label">Fruits</span>
                      </a>
                    </li>
                    <li className="nav-item flex-shrink-0">
                      <a
                        className="d-flex align-items-center justify-content-center px-3 py-1 py-lg-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#tab-4"
                      >
                        <span className="text-dark text-nowrap shop-product-tab-label">Bread</span>
                      </a>
                    </li>
                    <li className="nav-item flex-shrink-0">
                      <a
                        className="d-flex align-items-center justify-content-center px-3 py-1 py-lg-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href="#tab-5"
                      >
                        <span className="text-dark text-nowrap shop-product-tab-label">Meat</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {/* Product Item Example */}
                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/hand-pump-gi-pipes.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Hand pump gi pipes</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/galvanized-iron-pipe-nipple.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Galvanized iron pipe nipple</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/hand-pump-cylinder.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Hand pump cylinder</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/cast-iron-hand-pump.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Cast iron hand pump</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/india-mark-2-hand-pump.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>India mark 2 hand pump</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/hose-nipple.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Hose nipple</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/check-valve.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Check Valve</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/pipe-hooks.webp" className="img-fluid w-100 rounded-top" alt="Grapes" />
                      </div>
                      <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>Fruits</div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Pime hooks</h4>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  {/* Add more product items here */}
                </div>
              </div>
              {/* Repeat similar structure for other tabs */}
            </div>
          </div>
        </div>
      </div>
     {/* Products Section */}
    </>
  );
}