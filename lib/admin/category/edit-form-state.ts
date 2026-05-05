export type EditCategoryFormState =
  | { ok: true }
  | { ok: false; message: string };

export const editCategoryInitialState: EditCategoryFormState = {
  ok: false,
  message: "",
};
