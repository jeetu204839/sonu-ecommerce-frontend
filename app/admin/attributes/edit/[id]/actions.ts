"use server";

import { redirect } from "next/navigation";

import { updateAdminAttribute } from "@/lib/admin/attribute";
import type { EditAttributeFormState } from "@/lib/admin/attribute/edit-form-state";

export async function updateAttributeAction(
  _prev: EditAttributeFormState,
  formData: FormData,
): Promise<EditAttributeFormState> {
  const idField = formData.get("id");
  const id = Number.parseInt(typeof idField === "string" ? idField : "", 10);
  if (!Number.isFinite(id) || id <= 0) {
    return { ok: false, message: "Invalid attribute id." };
  }

  const nameField = formData.get("name");
  const name = typeof nameField === "string" ? nameField.trim() : "";
  if (!name) {
    return { ok: false, message: "Please enter an attribute name." };
  }

  const result = await updateAdminAttribute(id, name);
  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  redirect("/admin/attributes");
}
