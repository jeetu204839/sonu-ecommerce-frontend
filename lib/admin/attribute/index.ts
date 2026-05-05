/** Admin attribute API — types and fetch helpers. */
export type {
  AdminAttributeRow,
  AdminAttributesListData,
  AdminAttributesPagination,
} from "./types";

export {
  createAdminAttribute,
  fetchAdminAttributeById,
  fetchAdminAttributesPage,
  updateAdminAttribute,
} from "./api";
