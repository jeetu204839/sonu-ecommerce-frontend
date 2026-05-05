import {
  adminApiGetEnvelope,
  adminApiPostFormDataEnvelope,
  adminApiPutFormDataEnvelope,
} from "@/lib/admin/http";

import type {
  AdminCategoriesListData,
  AdminCategoryNode,
  AdminCategoryParentPick,
} from "./types";

/** List + single fetch use this segment. Upload uses `/admin/category/upload`. */
const ADMIN_CATEGORY_PATH = "/admin/category";
const ADMIN_CATEGORY_UPLOAD_PATH = `${ADMIN_CATEGORY_PATH}/upload`;

/**
 * Flatten the category tree for parent dropdown: every node can be a parent
 * (one parent may have many children).
 */
function collectAllCategoriesForParentPick(
  nodes: AdminCategoryNode[],
  into: AdminCategoryParentPick[],
  seenIds: Set<number>,
): void {
  for (const node of nodes) {
    if (!seenIds.has(node.id)) {
      seenIds.add(node.id);
      into.push({ id: node.id, name: node.name });
    }
    const kids = Array.isArray(node.children) ? node.children : [];
    if (kids.length > 0) {
      collectAllCategoriesForParentPick(kids, into, seenIds);
    }
  }
}

/** Load every paginated category page so we see the full catalog for the parent picker. */
async function fetchEveryAdminCategoryPage(): Promise<
  | { ok: true; categories: AdminCategoryNode[] }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const roots: AdminCategoryNode[] = [];
  let page = 1;

  while (true) {
    const res = await fetchAdminCategoriesPage(page);
    if (!res.ok) {
      return res;
    }
    roots.push(...res.data.categories);
    const next = res.data.pagination.next_page;
    if (next == null) {
      break;
    }
    page = next;
  }

  return { ok: true, categories: roots };
}

/**
 * All categories (full tree) for parent dropdown — parents with existing
 * children stay listed so you can add more siblings under the same parent.
 */
export async function fetchAdminCategoryParentPickList(): Promise<
  | { ok: true; options: AdminCategoryParentPick[] }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const res = await fetchEveryAdminCategoryPage();
  if (!res.ok) {
    return res;
  }

  const options: AdminCategoryParentPick[] = [];
  const seenIds = new Set<number>();
  collectAllCategoriesForParentPick(res.categories, options, seenIds);

  options.sort((a, b) => a.name.localeCompare(b.name));
  return { ok: true, options };
}

/**
 * Paginated list for `/admin/category?page=N`.
 */
export async function fetchAdminCategoriesPage(page: number) {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const query = new URLSearchParams({ page: String(safePage) });
  return adminApiGetEnvelope<AdminCategoriesListData>(
    `${ADMIN_CATEGORY_PATH}?${query.toString()}`,
  );
}

/**
 * Single category (detail) for `/admin/category/:id`.
 */
export async function fetchAdminCategoryById(id: number) {
  return adminApiGetEnvelope<AdminCategoryNode>(`${ADMIN_CATEGORY_PATH}/${id}`);
}

/**
 * Build multipart form fields expected by `/admin/category/upload`.
 * Omit empty `parentId` so Top-level behaves like Postman’s blank row.
 */
export function buildAdminCategoryUploadFormData(input: Readonly<{
  parentId?: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDesc: string;
  image: File;
}>): FormData {
  const fd = new FormData();
  const parent = input.parentId?.trim();
  if (parent !== undefined && parent !== "") {
    fd.append("parentId", parent);
  }

  fd.append("name", input.name);
  fd.append("description", input.description);
  fd.append("metaTitle", input.metaTitle);
  fd.append("metaDesc", input.metaDesc);
  fd.append("image", input.image);

  return fd;
}

/** Multipart POST to create a category (+ optional image upload). */
export async function createAdminCategoryUploadMultipart(formBody: FormData) {
  return adminApiPostFormDataEnvelope<AdminCategoryNode>(
    ADMIN_CATEGORY_UPLOAD_PATH,
    formBody,
  );
}

/**
 * Build multipart body for category update (`PUT /admin/category/upload/:id`).
 * Same fields as create. New `image` is sent only when the user picks a file.
 */
export function buildAdminCategoryUpdateFormData(input: Readonly<{
  parentId?: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDesc: string;
  image?: File;
}>): FormData {
  const fd = new FormData();
  const parent = input.parentId?.trim();
  if (parent !== undefined && parent !== "") {
    fd.append("parentId", parent);
  }

  fd.append("name", input.name);
  fd.append("description", input.description);
  fd.append("metaTitle", input.metaTitle);
  fd.append("metaDesc", input.metaDesc);

  if (input.image && input.image.size > 0) {
    fd.append("image", input.image);
  }

  return fd;
}

/** Multipart PUT to update — `PUT /admin/category/upload/:id` (form-data like Postman). */
export async function updateAdminCategoryUploadMultipart(
  id: number,
  formBody: FormData,
) {
  return adminApiPutFormDataEnvelope<AdminCategoryNode>(
    `${ADMIN_CATEGORY_UPLOAD_PATH}/${id}`,
    formBody,
  );
}
