import { Suspense } from "react";

import FeaturedHeroCarousel from "@/app/(shop)/component/FeaturedHeroCarousel";
import HomeProductsSection from "@/app/(shop)/component/HomeProductsSection";
import HomeProductsSectionFallback from "@/app/(shop)/component/HomeProductsSectionFallback";
import { fetchFeaturedProductsPage } from "@/lib/api/products";

type PageProps = Readonly<{
  searchParams: Promise<{ category?: string }>;
}>;

export default async function Shop({ searchParams }: PageProps) {
  const sp = await searchParams;
  const selectedCategory = sp.category?.trim() || "";

  const { products: featuredCarouselProducts } =
    await fetchFeaturedProductsPage(1);

  return (
    <>
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

      <Suspense fallback={<HomeProductsSectionFallback />}>
        <HomeProductsSection selectedCategory={selectedCategory} />
      </Suspense>
    </>
  );
}
