"use client";

import {
  type ChangeEvent,
  type SyntheticEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import { uploadProductImageAction } from "@/app/admin/products/details/[id]/upload-image-actions";
import {
  productUploadImageInitialState,
  type ProductUploadImageFormState,
} from "@/lib/admin/product/upload-image-form-state";
import {
  formatMaxProductImageSizeShort,
  getProductImageOversizeMessage,
  MAX_PRODUCT_IMAGE_BYTES,
} from "@/lib/admin/product/upload-limits";

type Props = Readonly<{
  productId: number;
}>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Uploading…" : "Upload image"}
    </button>
  );
}

export default function ProductImageUploadForm({ productId }: Props) {
  const [state, formAction] = useActionState<
    ProductUploadImageFormState,
    FormData
  >(uploadProductImageAction, productUploadImageInitialState);

  const [fileError, setFileError] = useState("");
  const [pickedPreview, setPickedPreview] = useState<string | null>(null);
  const pickedPreviewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (pickedPreviewRef.current) {
        URL.revokeObjectURL(pickedPreviewRef.current);
        pickedPreviewRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!state.ok) return;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (pickedPreviewRef.current) {
      URL.revokeObjectURL(pickedPreviewRef.current);
      pickedPreviewRef.current = null;
    }
    setPickedPreview(null);
    setFileError("");
  }, [state.ok]);

  function onImagePicked(ev: ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (pickedPreviewRef.current) {
      URL.revokeObjectURL(pickedPreviewRef.current);
      pickedPreviewRef.current = null;
    }
    if (!file) {
      setPickedPreview(null);
      setFileError("");
      return;
    }
    if (file.size > MAX_PRODUCT_IMAGE_BYTES) {
      setFileError(getProductImageOversizeMessage(file));
      setPickedPreview(null);
      ev.target.value = "";
      return;
    }
    setFileError("");
    const url = URL.createObjectURL(file);
    pickedPreviewRef.current = url;
    setPickedPreview(url);
  }

  function onFormSubmit(ev: SyntheticEvent<HTMLFormElement>) {
    const fd = new FormData(ev.currentTarget);
    const img = fd.get("image");
    if (img instanceof File && img.size > MAX_PRODUCT_IMAGE_BYTES) {
      ev.preventDefault();
      setFileError(getProductImageOversizeMessage(img));
    }
  }

  return (
    <form action={formAction} noValidate onSubmit={onFormSubmit}>
      <input type="hidden" name="productId" value={String(productId)} />

      <div className="box-body">
        <div className="form-group">
          <label htmlFor="product-upload-id">Product ID</label>
          <input
            id="product-upload-id"
            type="text"
            className="form-control"
            value={String(productId)}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-upload-image">
            Image <span className="text-danger">*</span>
          </label>
          <input
            ref={fileInputRef}
            id="product-upload-image"
            name="image"
            type="file"
            className="form-control"
            accept="image/*"
            required
            onChange={onImagePicked}
          />
          <p className="help-block">
            Max file size: {formatMaxProductImageSizeShort()}.
          </p>
          {fileError ? (
            <p className="text-danger" role="alert" style={{ marginTop: 8 }}>
              {fileError}
            </p>
          ) : null}
          {pickedPreview ? (
            <div style={{ marginTop: 12 }}>
              <p className="text-muted small" style={{ marginBottom: 8 }}>
                Preview
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element -- blob URL local preview */}
              <img
                src={pickedPreview}
                alt=""
                width={120}
                height={120}
                style={{
                  objectFit: "cover",
                  borderRadius: 4,
                  display: "block",
                }}
              />
            </div>
          ) : (
            <p className="text-muted" style={{ marginTop: 8 }}>
              Pick an image — a preview appears here.
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="product-upload-primary" className="checkbox-inline">
            <input
              id="product-upload-primary"
              name="isPrimary"
              type="checkbox"
              value="1"
              data-no-icheck
            />{" "}
            Set as primary image
          </label>
        </div>

        {state.message.trim() !== "" ? (
          <div
            className={state.ok ? "alert alert-success" : "alert alert-danger"}
            role="alert"
            style={{ marginBottom: 0 }}
          >
            {state.message}
          </div>
        ) : null}
      </div>

      <div className="box-footer">
        <SubmitButton />
      </div>
    </form>
  );
}
