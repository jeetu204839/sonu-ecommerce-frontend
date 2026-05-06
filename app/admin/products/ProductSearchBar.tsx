"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = Readonly<{
  defaultQuery: string;
}>;

export default function ProductSearchBar({ defaultQuery }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultQuery);

  useEffect(() => {
    setValue(defaultQuery);
  }, [defaultQuery]);

  function submit(next: string) {
    const q = new URLSearchParams();
    q.set("page", "1");
    const term = next.trim();
    if (term) q.set("search", term);
    const href = `/admin/products?${q.toString()}`;
    router.push(href);
    // Same-route query-only navigation may skip RSC refetch; defer refresh until after push applies.
    setTimeout(() => {
      router.refresh();
    }, 0);
  }

  return (
    <form
      className="form-inline"
      style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
      onSubmit={(e) => {
        e.preventDefault();
        submit(value);
      }}
    >
      <div className="input-group input-group-sm">
        <input
          type="search"
          className="form-control"
          placeholder="Search products…"
          aria-label="Search products"
          style={{ minWidth: 220 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-default">
            <i className="fa fa-search" />
          </button>
        </span>
      </div>
    </form>
  );
}
