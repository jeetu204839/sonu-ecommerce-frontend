"use server";

import { redirect } from "next/navigation";

import { createAdminAttribute } from "@/lib/admin/attribute";
import type { CreateAttributeFormState } from "@/lib/admin/attribute/create-form-state";

export async function createAttributeAction(
  _prev: CreateAttributeFormState,
  formData: FormData,
): Promise<CreateAttributeFormState> {
  const raw = formData.get("name");
  const name = typeof raw === "string" ? raw.trim() : "";

  if (!name) {
    return { ok: false, message: "Please enter an attribute name." };
  }

  const result = await createAdminAttribute(name);

  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  redirect("/admin/attributes");
}
