/** Admin categories — API + types grouped like `lib/admin/attribute`. */

export {
  createCategoryInitialState,
  type CreateCategoryFormState,
} from "./create-form-state";

export {
  editCategoryInitialState,
  type EditCategoryFormState,
} from "./edit-form-state";

export type {
  AdminCategoriesListData,
  AdminCategoriesPagination,
  AdminCategoryNode,
  AdminCategoryParentPick,
} from "./types";

export {
  buildAdminCategoryUpdateFormData,
  buildAdminCategoryUploadFormData,
  createAdminCategoryUploadMultipart,
  fetchAdminCategoriesPage,
  fetchAdminCategoryById,
  fetchAdminCategoryParentPickList,
  updateAdminCategoryUploadMultipart,
} from "./api";

export { buildParentDropdownForCategoryEdit } from "./edit-parent-dropdown";
export { resolveParentFromCategoryDetail } from "./parent-resolve";
