export type EditAttributeFormState =
  | { ok: true }
  | { ok: false; message: string };

export const editAttributeInitialState: EditAttributeFormState = {
  ok: false,
  message: "",
};
