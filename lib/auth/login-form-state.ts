export type AdminLoginFormState =
  | { ok: true }
  | { ok: false; message: string };

export const adminLoginInitialState: AdminLoginFormState = {
  ok: false,
  message: "",
};
