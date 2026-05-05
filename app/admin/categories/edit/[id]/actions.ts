"use server";

import { redirect } from "next/navigation";

import {
  buildAdminCategoryUpdateFormData,
  updateAdminCategoryUploadMultipart,
} from "@/lib/admin/category";
import type { EditCategoryFormState } from "@/lib/admin/category/edit-form-state";

export async function updateCategoryAction(
  _prev: EditCategoryFormState,
  formData: FormData,
): Promise<EditCategoryFormState> {
  const idField = formData.get("id");
  const id = Number.parseInt(typeof idField === "string" ? idField : "", 10);
  if (!Number.isFinite(id) || id <= 0) {
    return { ok: false, message: "Invalid category id." };
  }

  const parentRaw = formData.get("parentId");
  const parentId =
    typeof parentRaw === "string" && parentRaw.trim() !== ""
      ? parentRaw.trim()
      : undefined;

  const nameRaw = formData.get("name");
  const name = typeof nameRaw === "string" ? nameRaw.trim() : "";
  if (!name) {
    return { ok: false, message: "Please enter a category name." };
  }

  const descRaw = formData.get("description");
  const description = typeof descRaw === "string" ? descRaw.trim() : "";

  const metaTitleRaw = formData.get("metaTitle");
  const metaTitle = typeof metaTitleRaw === "string" ? metaTitleRaw.trim() : "";

  const metaDescRaw = formData.get("metaDesc");
  const metaDesc = typeof metaDescRaw === "string" ? metaDescRaw.trim() : "";

  const imageField = formData.get("image");
  const newImage =
    imageField instanceof File && imageField.size > 0 ? imageField : undefined;

  const multipart = buildAdminCategoryUpdateFormData({
    parentId,
    name,
    description,
    metaTitle,
    metaDesc,
    image: newImage,
  });

  const result = await updateAdminCategoryUploadMultipart(id, multipart);
  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  redirect("/admin/categories");
}
