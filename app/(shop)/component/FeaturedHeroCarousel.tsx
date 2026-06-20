"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";


import type { ShopProductCard } from "@/lib/api/products";

type FeaturedHeroCarouselProps = Readonly<{
  products: ShopProductCard[];
}>;

type BootstrapCarouselCtor = {
  getInstance: (element: Element) => { dispose: () => void } | null;
  new (
    element: Element,
    options?: { interval?: number; ride?: string | boolean; wrap?: boolean },
  ): { cycle: () => void; dispose: () => void };
};

function getBootstrapCarousel(): BootstrapCarouselCtor | undefined {
  const w = window as Window & { bootstrap?: { Carousel?: BootstrapCarouselCtor } };
  return w.bootstrap?.Carousel;
}

function waitForBootstrapCarousel(
  maxMs = 8000,
): Promise<BootstrapCarouselCtor | undefined> {
  return new Promise((resolve) => {
    const existing = getBootstrapCarousel();
    if (existing) {
      resolve(existing);
      return;
    }

    const started = Date.now();
    const timer = window.setInterval(() => {
      const Carousel = getBootstrapCarousel();
      if (Carousel) {
        window.clearInterval(timer);
        resolve(Carousel);
        return;
      }
      if (Date.now() - started >= maxMs) {
        window.clearInterval(timer);
        resolve(undefined);
      }
    }, 50);
  });
}

export default function FeaturedHeroCarousel({
  products,
}: FeaturedHeroCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || products.length < 2) return;

    let disposed = false;
    let instance: { dispose: () => void } | null = null;

    void waitForBootstrapCarousel().then((Carousel) => {
      if (disposed || !Carousel || !rootRef.current) return;

      const previous = Carousel.getInstance(rootRef.current);
      previous?.dispose();

      instance = new Carousel(rootRef.current, {
        interval: 5000,
        ride: "carousel",
        wrap: true,
      });
      (instance as any).cycle();
    });

    return () => {
      disposed = true;
      instance?.dispose();
    };
  }, [products]);

  if (!products.length) {
    return (
      <div
        ref={rootRef}
        id="carouselId"
        className="carousel slide position-relative"
        aria-label="Featured products"
      >
        <div className="carousel-inner rounded">
          <div className="carousel-item active rounded">
            <img src="/img/coming-soon.png"  className="rounded"  alt="Featured products coming soon"/>
          </div>
        </div>
      </div>
    );
  }

  const showControls = products.length > 1;

  return (
    <div
      ref={rootRef}
      id="carouselId"
      className="carousel slide position-relative"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      aria-label="Featured products"
    >
      <div className="carousel-inner" style={{backgroundColor: "white", borderRadius: "16px",}}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`carousel-item rounded${index === 0 ? " active" : ""}`}
          >
            {/* <img src={product.imageSrc} className="rounded " alt={product.name} style={{ objectFit: "contain" }} /> */}
            <Image src={product.imageSrc} alt={product.name} width={500} height={500} className="rounded" style={{ objectFit: "contain" }} />
            <Link
              href={`/details/${encodeURIComponent(product.slug)}`}
              className="btn px-4 py-2 text-white rounded"
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
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      ) : null}
    </div>
  );
}
