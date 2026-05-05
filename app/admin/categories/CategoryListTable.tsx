"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useState } from "react";

import type { AdminCategoryNode } from "@/lib/admin/category";

type Props = Readonly<{
  categories: AdminCategoryNode[];
  rowOffset: number;
}>;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function childList(cat: AdminCategoryNode): AdminCategoryNode[] {
  return Array.isArray(cat.children) ? cat.children : [];
}

function CategoryThumb({ url }: Readonly<{ url: string }>) {
  if (!url || url.endsWith("/null")) {
    return <span className="text-muted">—</span>;
  }
  return (
    <Image
      src={url}
      alt=""
      width={40}
      height={40}
      style={{ objectFit: "cover", borderRadius: 4 }}
      unoptimized
    />
  );
}

export default function CategoryListTable({
  categories,
  rowOffset,
}: Props) {
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  const toggle = useCallback((id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  if (categories.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={8} className="text-center text-muted">
            No categories on this page.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {categories.map((cat, index) => {
        const kids = childList(cat);
        const hasKids = kids.length > 0;
        const isOpen = expandedIds.has(cat.id);
        const toggleTitle = isOpen
          ? "Hide subcategories"
          : `Show ${kids.length} subcategories`;

        return (
          <Fragment key={cat.id}>
            <tr>
              <td>{rowOffset + index + 1}.</td>
              <td>
                <CategoryThumb url={cat.image} />
              </td>
              <td>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {hasKids ? (
                    <button
                      type="button"
                      className="btn btn-default btn-xs"
                      onClick={() => toggle(cat.id)}
                      aria-expanded={isOpen}
                      title={toggleTitle}
                    >
                      <i
                        className={`fa fa-chevron-${isOpen ? "down" : "right"}`}
                      />
                    </button>
                  ) : (
                    <span style={{ display: "inline-block", width: 26 }} />
                  )}
                  <span>{cat.name}</span>
                  {hasKids ? (
                    <span className="label label-info" title="Child categories">
                      {kids.length}
                    </span>
                  ) : null}
                </span>
              </td>
              <td>{cat.slug}</td>
              <td>{cat.status}</td>
              <td>{cat.productCount ?? "—"}</td>
              <td>{formatDate(cat.createdAt)}</td>
              <td>
                <Link
                  href={`/admin/categories/edit/${cat.id}`}
                  className="btn btn-default btn-sm"
                  title="View / edit"
                >
                  <i className="fa fa-edit" />
                </Link>
                &nbsp;|&nbsp;
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  title="Delete"
                >
                  <i className="fa fa-trash-o" />
                </button>
              </td>
            </tr>

            {hasKids && isOpen ? (
              <tr className="bg-gray">
                <td colSpan={8} style={{ padding: "8px 16px 16px 48px" }}>
                  <div
                    className="table-responsive"
                    style={{
                      borderLeft: "3px solid #3c8dbc",
                      paddingLeft: 12,
                      marginTop: 4,
                    }}
                  >
                    <p
                      className="text-muted text-sm"
                      style={{ marginBottom: 8 }}
                    >
                      <strong>Subcategories</strong> ({kids.length})
                    </p>
                    <table className="table table-condensed table-bordered table-striped bg-white">
                      <thead>
                        <tr>
                          <th style={{ width: 40 }}>#</th>
                          <th style={{ width: 56 }}>Image</th>
                          <th>Name</th>
                          <th>Slug</th>
                          <th>Status</th>
                          <th style={{ width: 80 }}>Products</th>
                          <th>Created at</th>
                          <th style={{ width: 130 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kids.map((child, ci) => (
                          <tr key={child.id}>
                            <td>{ci + 1}.</td>
                            <td>
                              <CategoryThumb url={child.image} />
                            </td>
                            <td>{child.name}</td>
                            <td>{child.slug}</td>
                            <td>{child.status}</td>
                            <td>{child.productCount ?? "—"}</td>
                            <td>{formatDate(child.createdAt)}</td>
                            <td>
                              <Link
                                href={`/admin/categories/edit/${child.id}`}
                                className="btn btn-default btn-xs"
                                title="View / edit"
                              >
                                <i className="fa fa-edit" />
                              </Link>
                              &nbsp;
                              <button
                                type="button"
                                className="btn btn-danger btn-xs"
                                title="Delete"
                              >
                                <i className="fa fa-trash-o" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ) : null}
          </Fragment>
        );
      })}
    </tbody>
  );
}
