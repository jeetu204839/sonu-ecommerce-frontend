export type ProductUploadImageFormState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export const productUploadImageInitialState: ProductUploadImageFormState = {
  ok: false,
  message: "",
};
