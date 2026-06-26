import Link from "next/link";
import Image from "next/image";

import FeaturedHeroCarouselInit from "@/app/(shop)/component/FeaturedHeroCarouselInit";
import type { ShopProductCard } from "@/lib/api/products";

type FeaturedHeroCarouselProps = Readonly<{
  products: ShopProductCard[];
}>;

export default function FeaturedHeroCarousel({
  products,
}: FeaturedHeroCarouselProps) {
  if (!products.length) {
    return (
      <div
        id="carouselId"
        className="carousel slide position-relative"
        aria-label="Featured products"
      >
        <div className="carousel-inner rounded">
          <div className="carousel-item active rounded">
            <Image
              src="/img/coming-soon.png"
              alt="Featured products coming soon"
              width={640}
              height={400}
              className="rounded w-100 h-auto"
              priority
              fetchPriority="high"
              sizes="(max-width: 991px) 100vw, 42vw"
              quality={75}
            />
          </div>
        </div>
      </div>
    );
  }

  const showControls = products.length > 1;

  return (
    <>
      <div
        id="carouselId"
        className="carousel slide position-relative"
        data-bs-ride={showControls ? "carousel" : undefined}
        data-bs-interval={showControls ? "5000" : undefined}
        aria-label="Featured products"
      >
        <div
          className="carousel-inner"
          style={{ backgroundColor: "white", borderRadius: "16px" }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-item rounded${index === 0 ? " active" : ""}`}
            >
              <Image
                src={product.imageSrc}
                alt={product.name}
                width={640}
                height={400}
                className="rounded w-100 h-auto"
                style={{ objectFit: "contain" }}
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : undefined}
                loading={index === 0 ? undefined : "lazy"}
                sizes="(max-width: 991px) 100vw, 42vw"
                quality={index === 0 ? 80 : 70}
              />
              <Link
                href={`/details/${encodeURIComponent(product.slug)}`}
                className="btn px-4 py-2 text-white rounded"
                aria-label={`View ${product.name}`}
              >
                {product.name}
              </Link>
            </div>
          ))}
        </div>

        {showControls ? (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselId"
              data-bs-slide="prev"
              aria-label="Previous featured product"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselId"
              data-bs-slide="next"
              aria-label="Next featured product"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </>
        ) : null}
      </div>

      <FeaturedHeroCarouselInit enabled={showControls} />
    </>
  );
}
