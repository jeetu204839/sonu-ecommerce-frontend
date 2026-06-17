import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { SHOP_AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";
import {
  fetchProductDetail,
  galleryImagesFromProduct,
} from "@/lib/api/products";

import ProductDetailBuyBox from "./ProductDetailBuyBox";
import ProductDetailTabs from "./ProductDetailTabs";
import ProductGallery from "./ProductGallery";
import ProductReviewTracker from "./ProductReviewTracker";
import { stripHtml } from "./product-detail-utils";

type PageProps = Readonly<{
  searchParams: Promise<{ slug?: string }>;
}>;

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const slug = sp.slug?.trim();
  if (!slug) {
    return {
      title: "Product detail | Ray Enterprises",
      description: "Browse product specifications and request a quote.",
    };
  }

  const { product } = await fetchProductDetail(slug);
  if (!product) {
    return { title: "Product not found | Ray Enterprises" };
  }

  const plainLong = product.longDescription?.trim()
    ? stripHtml(product.longDescription)
    : "";
  const description =
    product.metaDescription?.trim() ||
    product.shortDescription?.trim() ||
    plainLong ||
    `Buy ${product.name} online.`;

  return {
    title: `${product.metaTitle?.trim() || product.name} | Ray Enterprises`,
    description,
  };
}

export default async function DetailsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const slug = sp.slug?.trim();

  if (!slug) {
    return (
      <div className="container-fluid page-header py-4 py-lg-5">
        <div className="container text-center text-white">
          <h1 className="display-6 fw-bold mb-3 text-white">Product detail</h1>
          <p className="text-white-50 mb-4">
            Open a product from the shop to see its full listing.
          </p>
          <Link
            href="/shop"
            className="btn btn-light btn-lg rounded-pill px-4 fw-semibold"
          >
            Go to shop
          </Link>
        </div>
      </div>
    );
  }

  const { product } = await fetchProductDetail(slug);
  if (!product) {
    notFound();
  }

  const shopAuthToken = (await cookies())
    .get(SHOP_AUTH_TOKEN_COOKIE)
    ?.value?.trim();
  const isShopLoggedIn = Boolean(shopAuthToken);

  const images = galleryImagesFromProduct(product);
  const sellerName = product.vendor?.storeName?.trim() || "Ray Enterprises";
  const sellerVerified = Boolean(product.vendor?.isVerified);
  const detailUrl = `/details/${encodeURIComponent(product.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.metaDescription?.trim() ||
      product.shortDescription?.trim() ||
      undefined,
    image: images.map((i) => i.src),
    sku: product.sku,
    brand: { "@type": "Brand", name: sellerName },
    category: product.category.name,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stockStatus.toUpperCase() === "IN_STOCK" && product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: detailUrl,
    },
  };

  return (
    <>
      <ProductReviewTracker
        productId={product.id}
        isLoggedIn={isShopLoggedIn}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* <div className="container-fluid page-header py-4 py-lg-5">
        <div className="container text-center text-white">
          <h1 className="display-6 fw-bold mb-3 text-white text-truncate px-2">
            {product.name}
          </h1>
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 flex-wrap">
              <li className="breadcrumb-item">
                <Link href="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/shop" className="text-white text-decoration-none">
                  Shop
                </Link>
              </li>
              {product.category.slug ? (
                <li className="breadcrumb-item">
                  <Link
                    href={`/shop?category=${encodeURIComponent(product.category.slug)}&page=1`}
                    className="text-white text-decoration-none"
                  >
                    {product.category.name}
                  </Link>
                </li>
              ) : null}
              <li
                className="breadcrumb-item active text-white-50"
                aria-current="page"
              >
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div> */}

      <div className="container product-detail-page py-4 py-lg-5">
        {product.visibility?.toUpperCase() === "HIDDEN" ? (
          <div className="alert alert-warning border-0 mb-4 d-flex align-items-start gap-2 product-detail-alert">
            <i className="fas fa-eye-slash mt-1" aria-hidden="true" />
            <span>
              This listing is marked <strong>hidden</strong> in the catalog.
              You can still view it from this direct link.
            </span>
          </div>
        ) : null}

        <div className="row g-4 g-xl-5 align-items-start">
          <div className="col-lg-6">
            <ProductGallery images={images} productName={product.name} />
          </div>
          <div className="col-lg-6">
            <ProductDetailBuyBox product={product} />
          </div>
        </div>

        <div className="mt-5">
          <ProductDetailTabs
            product={product}
            sellerName={sellerName}
            sellerVerified={sellerVerified}
          />
        </div>
      </div>
    </>
  );
}
