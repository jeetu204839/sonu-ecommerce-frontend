"use server";

import { revalidatePath } from "next/cache";

import {
  buildAdminProductImageUploadFormData,
  uploadAdminProductImageMultipart,
} from "@/lib/admin/product";
import type { ProductUploadImageFormState } from "@/lib/admin/product/upload-image-form-state";

function asBool(raw: FormDataEntryValue | null): boolean {
  if (typeof raw !== "string") return false;
  const v = raw.trim().toLowerCase();
  return v === "1" || v === "true" || v === "on" || v === "yes";
}

export async function uploadProductImageAction(
  _prev: ProductUploadImageFormState,
  formData: FormData,
): Promise<ProductUploadImageFormState> {
  const productRaw = formData.get("productId");
  const productId =
    typeof productRaw === "string"
      ? Number.parseInt(productRaw.trim(), 10)
      : Number.NaN;
  if (!Number.isFinite(productId) || productId < 1) {
    return { ok: false, message: "Invalid product id." };
  }

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return { ok: false, message: "Please choose an image file." };
  }

  const isPrimary = asBool(formData.get("isPrimary"));

  const multipart = buildAdminProductImageUploadFormData({
    productId,
    image,
    isPrimary,
  });

  const result = await uploadAdminProductImageMultipart(multipart);
  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  revalidatePath(`/admin/products/details/${productId}`);
  revalidatePath(`/admin/products/edit/${productId}`);
  revalidatePath("/admin/products");

  return { ok: true, message: "Image uploaded successfully." };
}
