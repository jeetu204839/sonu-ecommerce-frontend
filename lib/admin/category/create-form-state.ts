export type CreateCategoryFormState =
  | { ok: true }
  | { ok: false; message: string };

export const createCategoryInitialState: CreateCategoryFormState = {
  ok: false,
  message: "",
};
