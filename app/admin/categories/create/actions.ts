"use server";

import { redirect } from "next/navigation";

import {
  buildAdminCategoryUploadFormData,
  createAdminCategoryUploadMultipart,
} from "@/lib/admin/category";
import type { CreateCategoryFormState } from "@/lib/admin/category/create-form-state";

export async function createCategoryAction(
  _prev: CreateCategoryFormState,
  formData: FormData,
): Promise<CreateCategoryFormState> {
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
  if (!(imageField instanceof File) || imageField.size === 0) {
    return { ok: false, message: "Please choose an image file." };
  }

  const multipart = buildAdminCategoryUploadFormData({
    parentId,
    name,
    description,
    metaTitle,
    metaDesc,
    image: imageField,
  });

  const result = await createAdminCategoryUploadMultipart(multipart);
  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  redirect("/admin/categories");
}
