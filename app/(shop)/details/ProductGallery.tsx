"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type ProductGalleryProps = Readonly<{
  images: { src: string; alt: string }[];
  productName: string;
}>;

function isRemoteImageSrc(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

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
      <div className="product-detail-gallery-main">
        <div className="position-absolute top-0 start-0 w-100 h-100 p-2 p-md-4">
          <div className="position-relative h-100 w-100">
            {isRemoteImageSrc(main.src) ? (
              // eslint-disable-next-line @next/next/no-img-element -- API URLs: avoid optimizer fetching localhost/backend (often fails); browser loads fine.
              // <img
              //   key={main.src}
              //   src={main.src}
              //   alt={main.alt}
              //   className="position-absolute top-0 start-0 h-100 w-100"
              //   style={{ objectFit: "contain" }}
              //   fetchPriority="high"
              //   decoding="async"
              // />
              <Image
                key={main.src}
                src={main.src}
                alt={main.alt || "image"}
                fill
                className="position-absolute top-0 start-0"
                style={{ objectFit: "contain" }}
                priority
              />
            ) : (
              <Image
                key={main.src}
                src={main.src}
                alt={main.alt}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
        </div>
      </div>

      <div
        className="product-detail-gallery-thumbs"
        role="listbox"
        aria-label={`${productName} gallery thumbnails`}
      >
        {safe.map((img, index) => {
          const isActive = index === active;
          return (
            <button
              key={`${index}-${img.src}`}
              type="button"
              role="option"
              aria-selected={isActive}
              className={`product-detail-gallery-thumb${
                isActive ? " is-active" : ""
              }`}
              onClick={() => setActive(index)}
              onKeyDown={(e) => onKeyNav(e, index)}
            >
              {isRemoteImageSrc(img.src) ? (
                // eslint-disable-next-line @next/next/no-img-element
                // <img
                //   src={img.src}
                //   alt=""
                //   width={64}
                //   height={64}
                //   className="w-100 h-100 rounded"
                //   style={{ objectFit: "contain" }}
                //   loading="lazy"
                //   decoding="async"
                // />
                <Image
                  src={img.src}
                  alt={img.alt || "image"}
                  width={64}
                  height={64}
                  className="rounded"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                />
              ) : (
                <Image
                  src={img.src}
                  alt=""
                  width={64}
                  height={64}
                  className="w-100 h-100 rounded"
                  style={{ objectFit: "contain" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
