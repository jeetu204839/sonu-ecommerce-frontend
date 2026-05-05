import type { AdminCategoryNode } from "./types";

export type ResolvedCategoryParent = Readonly<{
  id: number;
  /** From nested `parent` when the API sends it; otherwise fetch separately. */
  nameHint?: string;
}>;

function parsePositiveId(raw: unknown): number | null {
  if (raw === null || raw === undefined || raw === "") {
    return null;
  }
  if (typeof raw === "number") {
    const n = Math.trunc(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  if (typeof raw === "string") {
    const n = Number.parseInt(raw.trim(), 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return null;
}

/**
 * Normalize parent linkage from `/admin/category/:id`.
 * Covers `parentId`, `parent_id`, and `{ parent: { id, name } }`.
 */
export function resolveParentFromCategoryDetail(
  node: AdminCategoryNode,
): ResolvedCategoryParent | null {
  const flatId = parsePositiveId(node.parentId ?? node.parent_id);

  const nested = (
    node as AdminCategoryNode & {
      parent?: { id?: unknown; name?: unknown } | null;
    }
  ).parent;

  const nestedId =
    nested && typeof nested === "object" && nested !== null
      ? parsePositiveId(nested.id)
      : null;

  const nestedName =
    nested &&
    typeof nested === "object" &&
    typeof nested.name === "string" &&
    nested.name.trim() !== ""
      ? nested.name.trim()
      : undefined;

  const id = flatId ?? nestedId;

  if (id === null) {
    return null;
  }
  return { id, nameHint: nestedName };
}
