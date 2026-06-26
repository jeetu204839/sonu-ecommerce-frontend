import HomeFeaturedCategoryNav from "@/app/(shop)/component/HomeFeaturedCategoryNav";
import ShopProductCard from "@/app/(shop)/component/ShopProductCard";
import { fetchFeaturedCategories } from "@/lib/api/categories";
import { fetchRandomProductsPage } from "@/lib/api/products";

type Props = Readonly<{
  selectedCategory: string;
}>;

export default async function HomeProductsSection({ selectedCategory }: Props) {
  const [featuredCategories, randomResult] = await Promise.all([
    fetchFeaturedCategories(),
    fetchRandomProductsPage({
      page: 1,
      categorySlug: selectedCategory || undefined,
    }),
  ]);

  const products = randomResult.products;

  return (
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
  );
}
