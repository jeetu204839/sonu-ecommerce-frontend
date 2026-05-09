/** Admin products — API + types grouped like `lib/admin/category`. */

export type {
  AdminProductCategorySummary,
  AdminProductAttributeDto,
  AdminProductAttributeOptionDto,
  AdminProductImageRow,
  AdminProductRow,
  AdminProductsListData,
  AdminProductsPagination,
  AdminProductVendorSummary,
  CreateAdminProductAttribute,
  CreateAdminProductPayload,
  ProductAttributeFormEntry,
  UpdateAdminProductPayload,
} from "./types";

export {
  groupFormEntriesIntoAttributePayload,
  serializeCreateAdminProductBody,
  serializeUpdateAdminProductBody,
} from "./create-product-request";

export {
  createAdminProduct,
  fetchAdminProductById,
  fetchAdminProductsPage,
  updateAdminProduct,
} from "./api";

export type { AdminProductAttrRowSeed } from "./product-detail-form-map";

export {
  mapAdminProductDetailToEditDraft,
  productDetailToAttrRowSeeds,
} from "./product-detail-form-map";

export {
  createProductInitialState,
  emptyProductFormDraft,
  type CreateProductFormDraft,
  type CreateProductFormState,
} from "./create-form-state";

export {
  editProductInitialState,
  type EditProductFormDraft,
  type EditProductFormState,
} from "./edit-form-state";
