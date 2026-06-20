import FeaturedHeroCarousel from "@/app/(shop)/component/FeaturedHeroCarousel";
import HomeFeaturedCategoryNav from "@/app/(shop)/component/HomeFeaturedCategoryNav";
import ShopProductCard from "@/app/(shop)/component/ShopProductCard";
import { fetchFeaturedCategories } from "@/lib/api/categories";
import {
  fetchFeaturedProductsPage,
  fetchRandomProductsPage,
} from "@/lib/api/products";

type PageProps = Readonly<{
  searchParams: Promise<{ category?: string }>;
}>;

export default async function Shop({ searchParams }: PageProps) {
  const sp = await searchParams;
  const selectedCategory = sp.category?.trim() || "";
  const featuredCategories = await fetchFeaturedCategories();
  const { products: featuredCarouselProducts } =
    await fetchFeaturedProductsPage(1);
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

      {/* Hero Section — mobile: carousel only; desktop: headline + carousel */}
      <div className="container-fluid hero-header">
        <div className="container hero-header-inner py-3 py-lg-5">
          <div className="row g-lg-5 align-items-center">
            <div className="col-lg-7 d-none d-lg-block">
              <h1 className="mb-0 display-3 text-primary">
                Premium Quality Cast Iron Products
              </h1>
            </div>
            <div className="col-12 col-lg-5">
              <FeaturedHeroCarousel products={featuredCarouselProducts} />
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container-fluid fruite shop-products-section home-products-section py-4 py-lg-5 px-0">
        <div className="shop-products-inner container px-0 px-lg-3">
          <header className="home-products-header">
            <h1 className="home-products-title d-lg-none">
              Premium Quality Cast Iron Products
            </h1>
            <h2 className="home-products-title d-none d-lg-block">
              Premium Quality Cast Iron Products
            </h2>
            <p className="home-products-sub mb-0">
              Shop by category or browse the full collection below
            </p>
          </header>

          <HomeFeaturedCategoryNav
            categories={featuredCategories}
            activeSlug={selectedCategory}
          />

          <div className="home-products-grid-wrap">
            <div className="row shop-product-grid g-0 g-md-3 g-lg-4 mx-0">
              {products.length ? (
                products.map((product) => (
                  <div className="col-6 col-lg-4 col-xl-3" key={product.id}>
                    <ShopProductCard
                      product={product}
                      categoryLabel={selectedCategory || "All Products"}
                      showCategoryBadge
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 px-3">
                  <div className="alert alert-light border mb-0 home-products-empty">
                    No products found for this category.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
     {/* Products Section */}
    </>
  );
}