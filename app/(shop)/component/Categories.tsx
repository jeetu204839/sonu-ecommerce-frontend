import type { ReactNode } from "react";
import Link from "next/link";
import {
  fetchCategories,
  type CategoryListItem,
} from "@/lib/api/categories";

function categoryHref(slug: string): string {
  return `/shop?category=${encodeURIComponent(slug)}`;
}

function CategoryRow({ cat }: Readonly<{ cat: CategoryListItem }>) {
  const iconClass = cat.icon?.trim() ? cat.icon : "fas fa-folder";

  return (
    <li>
      <div className="d-flex justify-content-between fruite-name">
        <Link href={categoryHref(cat.slug)}>
          <i className={`${iconClass} me-2`} aria-hidden="true" />
          {cat.name}
        </Link>
        <span>({cat.productCount})</span>
      </div>
      {cat.children.length > 0 ? (
        <ul className="list-unstyled ms-3 mt-2 small">
          {cat.children
            .filter((c) => c.isActive)
            .map((child) => (
              <CategoryRow key={child.id} cat={child} />
            ))}
        </ul>
      ) : null}
    </li>
  );
}

/**
 * Server Component: runs on the server, calls your backend using API_BASE_URL.
 * Final request URL: {API_BASE_URL}/public/categories
 */
export default async function Categories() {
  let items: CategoryListItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await fetchCategories();
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Could not load categories.";
  }

  const visible = items.filter((c) => c.isActive);

  let body: ReactNode;
  if (errorMessage) {
    body = (
      <p className="small text-danger mb-0" role="alert">
        {errorMessage}
      </p>
    );
  } else if (visible.length === 0) {
    body = <p className="small text-muted mb-0">No categories found.</p>;
  } else {
    body = (
      <ul className="list-unstyled fruite-categorie">
        {visible.map((cat) => (
          <CategoryRow key={cat.id} cat={cat} />
        ))}
      </ul>
    );
  }

  return (
    <div className="col-lg-3">
      <div className="row g-4">
        <div className="col-lg-12">
          <div className="mb-3">
            <h4>Categories</h4>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
