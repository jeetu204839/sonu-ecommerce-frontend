
import Link from "next/link";

import { fetchFeaturedCategories } from "@/lib/api/categories";
import { fetchRandomProductsPage } from "@/lib/api/products";

type PageProps = Readonly<{
  searchParams: Promise<{ category?: string }>;
}>;

export default async function Shop({ searchParams }: PageProps) {
  const sp = await searchParams;
  const selectedCategory = sp.category?.trim() || "";
  const featuredCategories = await fetchFeaturedCategories();
  const { products } = await fetchRandomProductsPage({
    page: 1,
    categorySlug: selectedCategory || undefined,
  });
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
              <div className="position-relative mx-auto">
                <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search" />
                <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ top: '0', right: '25%' }}>Submit Now</button>
              </div>
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

                  {/* Product Tabs */}
                  <ul className="nav nav-pills d-flex flex-nowrap justify-content-lg-end gap-2 mb-3 mb-lg-5 pb-1">
                    <li className="nav-item flex-shrink-0">
                      <Link
                        className={`d-flex align-items-center justify-content-center px-3 py-1 py-lg-2 bg-light rounded-pill ${
                          selectedCategory === "" ? "active" : ""
                        }`}
                        href="/"
                        scroll={false}
                      >
                        <span className="text-dark text-nowrap shop-product-tab-label">All Products</span>
                      </Link>
                    </li>
                    {featuredCategories.map((category) => (
                      <li className="nav-item flex-shrink-0" key={category.id}>
                        <Link
                          className={`d-flex align-items-center justify-content-center px-3 py-1 py-lg-2 bg-light rounded-pill ${
                            selectedCategory === category.slug ? "active" : ""
                          }`}
                          href={`/category=${encodeURIComponent(category.slug)}`}
                          scroll={false}
                        >
                          <span className="text-dark text-nowrap shop-product-tab-label">
                            {category.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {/* Product Tabs */}
                </div>
              </div>
            </div>

            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {products.length ? (
                    products.map((product) => (
                      <div className="col-6 col-md-6 col-lg-4 col-xl-3" key={product.id}>
                        <div className="rounded position-relative fruite-item h-100 d-flex flex-column">
                          <div className="fruite-img">
                            <img
                              src={product.imageSrc}
                              className="img-fluid w-100 rounded-top"
                              alt={product.name}
                            />
                          </div>
                          <div
                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                            style={{ top: "10px", left: "10px" }}
                          >
                            {selectedCategory || "All Products"}
                          </div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom d-flex flex-column flex-grow-1">
                            <h4 className="mb-2">{product.name}</h4>
                            <div className="d-flex justify-content-between flex-lg-wrap mt-auto">
                              <p className="text-dark fs-5 fw-bold mb-0">
                                ₹{product.price.toLocaleString("en-IN")}
                              </p>
                              <Link
                                href={`/details?slug=${encodeURIComponent(product.slug)}`}
                                className="btn border border-secondary rounded-pill px-3 text-primary"
                              >
                                View details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div className="alert alert-light border border-secondary mb-0">
                        No products found for this category.
                      </div>
                    </div>
                  )}
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