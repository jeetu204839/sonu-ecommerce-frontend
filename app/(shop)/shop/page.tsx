import Link from "next/link";
import Categories from "../component/Categories";


export default function ShopPage() {
  return (
    <>
     <div className="container-fluid page-header py-5">
      <h1 className="text-center text-white display-6">Shop</h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item">
          <Link href="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link href="#">Pages</Link>
        </li>
        <li className="breadcrumb-item active text-white">Shop</li>
      </ol>
    </div>

    <div className="container-fluid fruite py-3">
      <div className="container-fluid" style={{border: '1px solid #000'}}>
        <div className="row g-4">
          <div className="col-lg-12">
            <div className="row g-4">
              
             <Categories />

              <div className="col-lg-9">
                <div className="row g-4 justify-content-center">
                  
                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-lg-6 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img">
                        <img src="/img/belcha-garden-round-hand.webp" className="img-fluid w-100 rounded-top" alt="" />
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>Belcha garden round hand</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                          <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Add more products as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
