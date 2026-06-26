import Link from "next/link";

import {
  formatProductInr,
  isProductInStock,
  type ProductDetailDto,
} from "@/lib/api/products";

import ProductDetailAttributes from "./ProductDetailAttributes";
import ProductDetailQuickContact from "./ProductDetailQuickContact";
import ProductEnquiryModal from "./ProductEnquiryModal";
import { stockBadgeClass, stockLabel } from "./product-detail-utils";

type ProductDetailBuyBoxProps = Readonly<{
  product: ProductDetailDto;
}>;

export default function ProductDetailBuyBox({ product }: ProductDetailBuyBoxProps) {
  const sellerName = product.vendor?.storeName?.trim() || "Ray Enterprises";
  const sellerVerified = Boolean(product.vendor?.isVerified);
  const inStock = isProductInStock(product);
  const hasDiscount =
    product.mrp > product.price && product.mrp > 0 && product.discountPercent > 0;

  return (
    <div className="product-detail-buybox">
      <div className="product-detail-badges">
        {product.isFeatured ? (
          <span className="product-detail-badge product-detail-badge--featured">
            Featured
          </span>
        ) : null}
        {product.category.name ? (
          <Link
            href={
              product.category.slug
                ? `/shop?category=${encodeURIComponent(product.category.slug)}&page=1`
                : "/shop?page=1"
            }
            className="product-detail-badge product-detail-badge--category"
          >
            {product.category.name}
          </Link>
        ) : null}
        <span
          className={`product-detail-stock ${stockBadgeClass(product.stockStatus)}`}
        >
          {stockLabel(product.stockStatus)}
        </span>
      </div>

      <h1 className="product-detail-title">{product.name}</h1>

      <p className="product-detail-sku mb-0">
        SKU: <span>{product.sku}</span>
      </p>

      <div className="product-detail-pricing">
        <span className="product-detail-price">₹{formatProductInr(product.price)}</span>
        {product.mrp > product.price && product.mrp > 0 ? (
          <span className="product-detail-mrp">₹{formatProductInr(product.mrp)}</span>
        ) : null}
        {hasDiscount ? (
          <span className="product-detail-discount">
            {product.discountPercent}% off
          </span>
        ) : null}
        <span className="product-detail-tax-note">incl. GST where applicable</span>
      </div>

      {product.shortDescription?.trim() ? (
        <p className="product-detail-short-desc">{product.shortDescription}</p>
      ) : null}

      <ProductDetailAttributes attributes={product.attributes ?? []} />

      <ul className="product-detail-meta-list">
        <li>
          <i className="fas fa-store" aria-hidden="true" />
          <span>
            Sold by{" "}
            <strong>{sellerName}</strong>
            {sellerVerified ? (
              <span className="product-detail-verified">
                <i className="fas fa-check-circle" aria-hidden="true" /> Verified
              </span>
            ) : null}
          </span>
        </li>
        {product.stock > 0 ? (
          <li>
            <i className="fas fa-boxes" aria-hidden="true" />
            <span>
              <strong>{product.stock}</strong> unit(s) available
            </span>
          </li>
        ) : null}
        <li>
          <i className="fas fa-truck" aria-hidden="true" />
          <span>Freight quoted by pin code &amp; weight at checkout</span>
        </li>
      </ul>

      <div className="product-detail-actions">
        <div className="product-detail-qty-wrap">
          <label htmlFor="product-qty" className="product-detail-qty-label">
            Quantity
          </label>
          <input
            id="product-qty"
            type="number"
            min={1}
            max={product.stock > 0 ? product.stock : undefined}
            defaultValue={1}
            className="form-control product-detail-qty-input"
            disabled={!inStock}
          />
        </div>

        <div className="product-detail-cta-wrap">
          {inStock ? (
            <ProductEnquiryModal
              productId={product.id}
              productName={product.name}
              productSku={product.sku}
            />
          ) : (
            <button
              type="button"
              className="btn btn-secondary product-detail-action-btn w-100"
              disabled
            >
              Currently unavailable
            </button>
          )}
          <ProductDetailQuickContact
            productName={product.name}
            productSku={product.sku}
          />
          <Link
            href={`/contact?sku=${encodeURIComponent(product.sku)}`}
            className="product-detail-contact-link"
          >
            Prefer the full contact page?
          </Link>
          <p className="product-detail-cta-hint mb-0">
            Share quantity, delivery location, and timeline—we will confirm
            availability and freight.
          </p>
        </div>
      </div>
    </div>
  );
}
