"use server";

import { revalidatePath } from "next/cache";

import { deleteAdminProductImage } from "@/lib/admin/product";

export type DeleteProductImageResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function deleteProductImageAction(
  productId: number,
  imageId: number,
): Promise<DeleteProductImageResult> {
  if (!Number.isFinite(productId) || productId < 1) {
    return { ok: false, message: "Invalid product id." };
  }
  if (!Number.isFinite(imageId) || imageId < 1) {
    return { ok: false, message: "Invalid image id." };
  }

  const result = await deleteAdminProductImage(imageId);
  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  revalidatePath(`/admin/products/details/${productId}`);
  revalidatePath(`/admin/products/edit/${productId}`);
  revalidatePath("/admin/products");

  return {
    ok: true,
    message: result.message?.trim() || "Deleted successfully",
  };
}
