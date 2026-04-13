import type { ReactNode } from "react";
import Link from "next/link";
import { fetchCategories } from "@/lib/api/categories";

/**
 * Server Component: runs on the server, calls your backend using API_BASE_URL.
 * Final request URL: {API_BASE_URL}/public/categories
 */
export default async function Categories() {
  let items: Awaited<ReturnType<typeof fetchCategories>> = [];
  let errorMessage: string | null = null;

  try {
    items = await fetchCategories();
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Could not load categories.";
  }

  let body: ReactNode;
  if (errorMessage) {
    body = (
      <p className="small text-danger mb-0" role="alert">
        {errorMessage}
      </p>
    );
  } else if (items.length === 0) {
    body = <p className="small text-muted mb-0">No categories found.</p>;
  } else {
    body = (
      <ul className="list-unstyled fruite-categorie">
        {items.map((cat) => (
          <li key={cat.id}>
            <div className="d-flex justify-content-between fruite-name">
              <Link href={cat.href}>
                <i className="fas fa-folder me-2" aria-hidden="true" />
                {cat.name}
              </Link>
              {cat.count === null ? null : <span>({cat.count})</span>}
            </div>
          </li>
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
