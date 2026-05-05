export type CreateAttributeFormState =
  | { ok: true }
  | { ok: false; message: string };

export const createAttributeInitialState: CreateAttributeFormState = {
  ok: false,
  message: "",
};
