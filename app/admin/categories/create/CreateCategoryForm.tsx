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

import { createCategoryAction } from "@/app/admin/categories/create/actions";
import type { AdminCategoryParentPick } from "@/lib/admin/category";
import {
  createCategoryInitialState,
  type CreateCategoryFormState,
} from "@/lib/admin/category/create-form-state";
import {
  getCategoryImageOversizeMessage,
  MAX_CATEGORY_IMAGE_BYTES,
  formatMaxCategoryImageSizeShort,
} from "@/lib/admin/category/upload-limits";

type Props = Readonly<{
  parentOptions: AdminCategoryParentPick[];
  parentsLoadWarning?: string;
}>;

function SubmitButton({ submitBlocked }: Readonly<{ submitBlocked: boolean }>) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={pending || submitBlocked}
    >
      {pending ? "Saving…" : "Submit"}
    </button>
  );
}

export default function CreateCategoryForm({
  parentOptions,
  parentsLoadWarning,
}: Props) {
  const [state, formAction] = useActionState<
    CreateCategoryFormState,
    FormData
  >(createCategoryAction, createCategoryInitialState);

  const showError = !state.ok && state.message.trim() !== "";

  const [imageFileError, setImageFileError] = useState("");
  const [pickedPreview, setPickedPreview] = useState<string | null>(null);
  const pickedPreviewRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (pickedPreviewRef.current) {
        URL.revokeObjectURL(pickedPreviewRef.current);
        pickedPreviewRef.current = null;
      }
    };
  }, []);

  function onImagePicked(ev: ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (pickedPreviewRef.current) {
      URL.revokeObjectURL(pickedPreviewRef.current);
      pickedPreviewRef.current = null;
    }
    if (!file) {
      setPickedPreview(null);
      setImageFileError("");
      return;
    }
    if (file.size > MAX_CATEGORY_IMAGE_BYTES) {
      setImageFileError(getCategoryImageOversizeMessage(file));
      setPickedPreview(null);
      ev.target.value = "";
      return;
    }
    setImageFileError("");
    const url = URL.createObjectURL(file);
    pickedPreviewRef.current = url;
    setPickedPreview(url);
  }

  function onFormSubmit(ev: SyntheticEvent<HTMLFormElement>) {
    const fd = new FormData(ev.currentTarget);
    const img = fd.get("image");
    if (img instanceof File && img.size > MAX_CATEGORY_IMAGE_BYTES) {
      ev.preventDefault();
      setImageFileError(getCategoryImageOversizeMessage(img));
    }
  }

  return (
    <form action={formAction} noValidate onSubmit={onFormSubmit}>
      <div className="box-body">
        {parentsLoadWarning ? (
          <div className="alert alert-warning" role="alert">
            Could not load parent list: {parentsLoadWarning}. You can still
            save as top-level without a parent.
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="category-parent">Parent category</label>
          <select
            id="category-parent"
            name="parentId"
            className="form-control"
            defaultValue=""
          >
            <option value="">None (top-level)</option>
            {parentOptions.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.name}
              </option>
            ))}
          </select>
          <p className="help-block">
            Any category can be a parent — the same parent can have multiple
            child categories.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="category-name">
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="category-name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Category name"
            autoComplete="off"
            required
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category-description">Description</label>
          <textarea
            id="category-description"
            name="description"
            className="form-control"
            rows={4}
            placeholder="Short description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category-image">
            Image <span className="text-danger">*</span>
          </label>
          <input
            id="category-image"
            name="image"
            type="file"
            className="form-control"
            accept="image/*"
            required
            onChange={onImagePicked}
          />
          <p className="help-block">
            Max file size: {formatMaxCategoryImageSizeShort()}.
          </p>
          {imageFileError ? (
            <p className="text-danger" role="alert" style={{ marginTop: 8 }}>
              {imageFileError}
            </p>
          ) : null}
          {pickedPreview ? (
            <div style={{ marginTop: 12 }}>
              <p className="text-muted small" style={{ marginBottom: 8 }}>
                Preview
              </p>
              
              {/* eslint-disable-next-line @next/next/no-img-element -- blob: URLs from local file */}
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
          <label htmlFor="category-meta-title">Meta title</label>
          <input
            id="category-meta-title"
            name="metaTitle"
            type="text"
            className="form-control"
            placeholder="SEO title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category-meta-desc">Meta description</label>
          <textarea
            id="category-meta-desc"
            name="metaDesc"
            className="form-control"
            rows={2}
            placeholder="SEO description"
          />
        </div>

        {showError ? (
          <span className="text-danger">{state.message}</span>
        ) : null}
      </div>

      <div className="box-footer">
        <SubmitButton submitBlocked={!!imageFileError} />
      </div>
    </form>
  );
}
