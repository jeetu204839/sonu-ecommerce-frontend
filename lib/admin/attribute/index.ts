/** Admin attribute API — types and fetch helpers. */
export type {
  AdminAttributeRow,
  AdminAttributesListData,
  AdminAttributesPagination,
} from "./types";

export {
  createAdminAttribute,
  fetchAdminAttributeById,
  fetchAdminAttributesAll,
  fetchAdminAttributesPage,
  updateAdminAttribute,
} from "./api";
