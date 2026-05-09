/** Client + server: snapshot of create-product fields when submission fails (preserves user input). */
export type CreateProductFormDraft = {
  name: string;
  sku: string;
  categoryId: string;
  vendorId: string;
  mrp: string;
  price: string;
  discountPercent: string;
  stock: string;
  stockStatus: string;
  status: string;
  visibility: string;
  isFeatured: boolean;
  weight: string;
  weightUnit: string;
  length: string;
  lengthUnit: string;
  width: string;
  widthUnit: string;
  height: string;
  heightUnit: string;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  attributesJson: string;
};

export const emptyProductFormDraft: CreateProductFormDraft = {
  name: "",
  sku: "",
  categoryId: "",
  vendorId: "1",
  mrp: "0",
  price: "0",
  discountPercent: "0",
  stock: "0",
  stockStatus: "IN_STOCK",
  status: "ACTIVE",
  visibility: "CATALOG_SEARCH",
  isFeatured: false,
  weight: "0",
  weightUnit: "kg",
  length: "0",
  lengthUnit: "cm",
  width: "0",
  widthUnit: "cm",
  height: "0",
  heightUnit: "cm",
  shortDescription: "",
  longDescription: "",
  metaTitle: "",
  metaDescription: "",
  attributesJson: "[]",
};

export type CreateProductFormState =
  | { ok: true }
  | {
      ok: false;
      message: string;
      draft?: CreateProductFormDraft;
      /** API `errors[].path` → `msg` for inline field hints (e.g. name, sku). */
      fieldErrors?: Record<string, string>;
    };

export const createProductInitialState: CreateProductFormState = {
  ok: false,
  message: "",
};
