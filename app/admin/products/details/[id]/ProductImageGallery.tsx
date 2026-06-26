"use client";

import { useCallback, useState, useTransition } from "react";

import AdminConfirmDialog from "@/app/admin/component/common/AdminConfirmDialog";
import { deleteProductImageAction } from "@/app/admin/products/details/[id]/delete-image-actions";
import type { AdminProductImageRow } from "@/lib/admin/product";
import { resolveProductImageUrl } from "@/lib/api/products";

type Props = Readonly<{
  productId: number;
  productName: string;
  images: AdminProductImageRow[];
}>;

export default function ProductImageGallery({
  productId,
  productName,
  images,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmImageId, setConfirmImageId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(
    null,
  );

  const closeConfirm = useCallback(() => {
    if (isPending) return;
    setConfirmImageId(null);
  }, [isPending]);

  const confirmDelete = useCallback(() => {
    if (confirmImageId == null || isPending) return;

    const imageId = confirmImageId;
    setFeedback(null);
    setDeletingId(imageId);
    startTransition(async () => {
      const result = await deleteProductImageAction(productId, imageId);
      setDeletingId(null);
      setConfirmImageId(null);
      setFeedback({ ok: result.ok, message: result.message });
    });
  }, [confirmImageId, isPending, productId]);

  if (images.length === 0) {
    return null;
  }

  const pendingImage = images.find((img) => img.id === confirmImageId);

  return (
    <>
      <div className="box box-default">
        <div className="box-header with-border">
          <h3 className="box-title">Gallery</h3>
        </div>
        <div className="box-body">
          {feedback ? (
            <div
              className={feedback.ok ? "alert alert-success" : "alert alert-danger"}
              role="alert"
              style={{ marginBottom: 12 }}
            >
              {feedback.message}
            </div>
          ) : null}

          <div className="row">
            {images.map((img) => {
              const isDeleting = deletingId === img.id && isPending;
              return (
                <div
                  className="col-sm-2 col-xs-4"
                  key={img.id}
                  style={{ marginBottom: 10, position: "relative" }}
                >
                  <button
                    type="button"
                    aria-label={`Delete image ${img.id}`}
                    disabled={isPending}
                    onClick={() => setConfirmImageId(img.id)}
                    style={{
                      position: "absolute",
                      top: -10,
                      right: 0,
                      background: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      cursor: isPending ? "not-allowed" : "pointer",
                      opacity: isPending && deletingId !== img.id ? 0.5 : 1,
                    }}
                  >
                    {isDeleting ? "…" : "×"}
                  </button>

                  <img
                    src={resolveProductImageUrl(img.imageUrl)}
                    alt={productName}
                    className="img-responsive img-thumbnail"
                    style={{ width: "100%", height: 90, objectFit: "cover" }}
                  />
                  {img.isPrimary ? (
                    <span
                      className="label label-primary"
                      style={{ marginTop: 4, display: "inline-block" }}
                    >
                      Primary
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AdminConfirmDialog
        open={confirmImageId != null}
        title="Delete image"
        message={
          <>
            <p style={{ marginBottom: 8 }}>Are you sure to delete this image?</p>
            {pendingImage ? (
              <div className="text-center" style={{ marginBottom: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail preview */}
                <img
                  src={resolveProductImageUrl(pendingImage.imageUrl)}
                  alt=""
                  className="img-thumbnail"
                  style={{ maxWidth: 120, maxHeight: 90, objectFit: "cover" }}
                />
                {pendingImage.isPrimary ? (
                  <p className="text-muted small" style={{ marginTop: 8, marginBottom: 0 }}>
                    This is the primary product image.
                  </p>
                ) : null}
              </div>
            ) : null}
          </>
        }
        confirmLabel="Yes, delete"
        cancelLabel="Cancel"
        loading={isPending}
        onConfirm={confirmDelete}
        onCancel={closeConfirm}
      />
    </>
  );
}
