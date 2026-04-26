import type {
  AdminAttributesListData,
} from "@/lib/admin/attributes-types";
import { adminApiGetEnvelope } from "@/lib/admin/http";

const ATTRIBUTE_LIST_PATH = "/admin/attribute";

export async function fetchAdminAttributesPage(page: number) {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const query = new URLSearchParams({ page: String(safePage) });
  return adminApiGetEnvelope<AdminAttributesListData>(
    `${ATTRIBUTE_LIST_PATH}?${query.toString()}`,
  );
}
