"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type NavSearchFormProps = Readonly<{
  className?: string;
  /** Tighter layout on small screens (second header row). */
  compact?: boolean;
}>;

export default function NavSearchForm({
  className = "",
  compact = false,
}: NavSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    router.push(`/search/${encodeURIComponent(term)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`shop-nav-search-form ${compact ? "shop-nav-search-form--compact" : ""} ${className}`.trim()}
      role="search"
    >
      <div className="shop-nav-search-cluster">
        <button
          type="button"
          className="shop-nav-loc"
          aria-haspopup="listbox"
          aria-label="Search location"
        >
          <i className="fas fa-map-marker-alt shop-nav-loc-pin" aria-hidden="true" />
          <span className="shop-nav-loc-text">India</span>
          <i className="fas fa-chevron-down shop-nav-loc-chevron" aria-hidden="true" />
        </button>
        <span className="shop-nav-search-rule" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="shop-nav-search-input"
          placeholder="Enter product / service to search"
          aria-label="Search products or services"
          autoComplete="off"
        />
        <button
          type="button"
          className="shop-nav-cam"
          aria-label="Search by image (coming soon)"
          title="Search by image"
        >
          <i className="fas fa-camera" aria-hidden="true" />
        </button>
        <button type="submit" className="shop-nav-search-submit">
          <i className="fas fa-search" aria-hidden="true" />
          <span className="ms-1">Search</span>
        </button>
      </div>
    </form>
  );
}
