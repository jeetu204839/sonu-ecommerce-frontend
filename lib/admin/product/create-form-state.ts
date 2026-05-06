export type CreateProductFormState =
  | { ok: true }
  | { ok: false; message: string };

export const createProductInitialState: CreateProductFormState = {
  ok: false,
  message: "",
};
