import {
  adminApiGetEnvelope,
  adminApiPostEnvelope,
  adminApiPutEnvelope,
} from "@/lib/admin/http";

import type { AdminAttributeRow, AdminAttributesListData } from "./types";

/** List + create both use this backend path (GET with query, POST with JSON body). */
const ADMIN_ATTRIBUTE_PATH = "/admin/attribute";

/**
 * Load one page of attributes for the admin list screen.
 * Page number must be >= 1; invalid values become page 1.
 */
export async function fetchAdminAttributesPage(page: number) {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const query = new URLSearchParams({ page: String(safePage) });
  return adminApiGetEnvelope<AdminAttributesListData>(
    `${ADMIN_ATTRIBUTE_PATH}?${query.toString()}`,
  );
}

/** All attribute definitions (follows every list page until `next_page` is null). */
export async function fetchAdminAttributesAll(): Promise<
  | { ok: true; attributes: AdminAttributeRow[] }
  | { ok: false; message: string; unauthorized?: boolean }
> {
  const all: AdminAttributeRow[] = [];
  let page = 1;

  while (true) {
    const res = await fetchAdminAttributesPage(page);
    if (!res.ok) {
      return res;
    }
    all.push(...res.data.attributes);
    const next = res.data.pagination.next_page;
    if (next == null) {
      break;
    }
    page = next;
  }

  return { ok: true, attributes: all };
}

/**
 * Create an attribute. Payload: `{ name }`.
 * On success the API should return the usual `{ status, message, data }` envelope with the created row in `data`.
 */
export async function createAdminAttribute(name: string) {
  return adminApiPostEnvelope<AdminAttributeRow>(ADMIN_ATTRIBUTE_PATH, {
    name,
  });
}

/**
 * Get one attribute by id from backend.
 */
export async function fetchAdminAttributeById(id: number) {
  return adminApiGetEnvelope<AdminAttributeRow>(`${ADMIN_ATTRIBUTE_PATH}/${id}`);
}

/**
 * Update an attribute name by id.
 */
export async function updateAdminAttribute(id: number, name: string) {
  return adminApiPutEnvelope<AdminAttributeRow>(`${ADMIN_ATTRIBUTE_PATH}/${id}`, {
    name,
  });
}
