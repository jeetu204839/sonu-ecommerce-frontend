"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type ProductGalleryProps = Readonly<{
  images: { src: string; alt: string }[];
  productName: string;
}>;

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  const safe =
    images.length > 0 ? images : [{ src: "/img/logo.webp", alt: productName }];
  const main = safe[active] ?? safe[0];

  const onKeyNav = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(index);
      }
    },
    [],
  );

  return (
    <div className="product-detail-gallery">
      <div
        className="position-relative w-100 bg-white border border-secondary rounded overflow-hidden mb-3"
        style={{
          aspectRatio: "1 / 1",
          maxHeight: "min(520px, 85vw)",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 p-2 p-md-4">
          <div className="position-relative h-100 w-100">
            <Image
              key={main.src}
              src={main.src}
              alt={main.alt}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-wrap gap-2"
        role="listbox"
        aria-label={`${productName} gallery thumbnails`}
      >
        {safe.map((img, index) => {
          const isActive = index === active;
          return (
            <button
              key={img.src}
              type="button"
              role="option"
              aria-selected={isActive}
              className={`p-1 border rounded bg-white ${
                isActive ? "border-primary border-2" : "border-secondary"
              }`}
              style={{ width: "72px", height: "72px" }}
              onClick={() => setActive(index)}
              onKeyDown={(e) => onKeyNav(e, index)}
            >
              <Image
                src={img.src}
                alt=""
                width={64}
                height={64}
                className="w-100 h-100 rounded"
                style={{ objectFit: "contain" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
