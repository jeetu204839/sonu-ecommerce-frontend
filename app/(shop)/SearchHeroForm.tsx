"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SearchHeroFormProps = Readonly<{
  initialQuery?: string;
  className?: string;
}>;

export default function SearchHeroForm({
  initialQuery = "",
  className = "",
}: SearchHeroFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    router.push(`/search/${encodeURIComponent(term)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`w-100 ${className}`.trim()}
      style={{ maxWidth: "42rem" }}
    >
      <div
        className="d-flex align-items-stretch bg-white rounded-pill shadow-sm border border-secondary-subtle p-1"
        style={{ minHeight: "3.5rem" }}
      >
        <div className="d-flex align-items-center ps-3 text-secondary">
          <i className="fas fa-search" aria-hidden="true" />
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control border-0 bg-transparent px-3"
          type="search"
          placeholder="Search by product name, e.g. hand pump"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="btn btn-primary rounded-pill px-4 px-md-5 fw-semibold"
        >
          Search
        </button>
      </div>
    </form>
  );
}
