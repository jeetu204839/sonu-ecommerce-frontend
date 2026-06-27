import Link from "next/link";
import Image from "next/image";

import FeaturedHeroCarouselInit from "@/app/(shop)/component/FeaturedHeroCarouselInit";
import type { ShopProductCard } from "@/lib/api/products";

type FeaturedHeroCarouselProps = Readonly<{
  products: ShopProductCard[];
}>;

function HeroSlideImage({
  src,
  alt,
  priority,
}: Readonly<{
  src: string;
  alt: string;
  priority?: boolean;
}>) {
  return (
    <div className="featured-hero-slide-media">
      <Image
        src={src}
        alt={alt}
        fill
        className="featured-hero-slide-img"
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? undefined : "lazy"}
        sizes="(max-width: 991px) 100vw, 42vw"
        quality={priority ? 70 : 55}
      />
    </div>
  );
}

export default function FeaturedHeroCarousel({
  products,
}: FeaturedHeroCarouselProps) {
  if (!products.length) {
    return (
      <div
        id="carouselId"
        className="carousel slide position-relative featured-hero-carousel"
        aria-label="Featured products"
      >
        <div className="carousel-inner rounded">
          <div className="carousel-item active rounded">
            <HeroSlideImage
              src="/img/coming-soon.png"
              alt="Featured products coming soon"
              priority
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
        className="carousel slide position-relative featured-hero-carousel"
        data-bs-ride={showControls ? "carousel" : undefined}
        data-bs-interval={showControls ? "5000" : undefined}
        aria-label="Featured products"
      >
        <div className="carousel-inner featured-hero-carousel-inner">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-item rounded${index === 0 ? " active" : ""}`}
            >
              <HeroSlideImage
                src={product.imageSrc}
                alt={product.name}
                priority={index === 0}
              />
              <Link
                href={`/details/${encodeURIComponent(product.slug)}`}
                className="btn px-4 py-2 text-white rounded featured-hero-slide-cta"
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
