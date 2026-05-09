import type { CreateProductFormDraft } from "@/lib/admin/product/create-form-state";

/** Edit draft = create draft + editable slug (PUT body expects `slug`). */
export type EditProductFormDraft = CreateProductFormDraft & {
  slug: string;
};

export type EditProductFormState =
  | { ok: true }
  | {
      ok: false;
      message: string;
      draft?: EditProductFormDraft;
      fieldErrors?: Record<string, string>;
    };

export const editProductInitialState: EditProductFormState = {
  ok: false,
  message: "",
};
