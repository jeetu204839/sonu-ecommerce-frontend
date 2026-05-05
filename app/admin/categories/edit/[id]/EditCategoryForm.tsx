"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  type ReactNode,
  type SyntheticEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import { updateCategoryAction } from "@/app/admin/categories/edit/[id]/actions";
import type { AdminCategoryParentPick } from "@/lib/admin/category";
import {
  editCategoryInitialState,
  type EditCategoryFormState,
} from "@/lib/admin/category/edit-form-state";
import {
  getCategoryImageOversizeMessage,
  MAX_CATEGORY_IMAGE_BYTES,
  formatMaxCategoryImageSizeShort,
} from "@/lib/admin/category/upload-limits";

export type EditCategoryInitialValues = Readonly<{
  id: number;
  name: string;
  slug: string;
  status: string;
  description: string;
  metaTitle: string | null;
  metaDesc: string | null;
  imageUrl: string | null;
  parentId?: number | null;
}>;

type Props = Readonly<{
  initial: EditCategoryInitialValues;
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
      {pending ? "Updating…" : "Update"}
    </button>
  );
}

export default function EditCategoryForm({
  initial,
  parentOptions,
  parentsLoadWarning,
}: Props) {
  const [state, formAction] = useActionState<
    EditCategoryFormState,
    FormData
  >(updateCategoryAction, editCategoryInitialState);

  const showError = !state.ok && state.message.trim() !== "";

  const parentSelectValue =
    initial.parentId != null && Number.isFinite(initial.parentId)
      ? String(initial.parentId)
      : "";

  const showImagePreview =
    !!initial.imageUrl && !initial.imageUrl.endsWith("/null");

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

  let imagePreviewBlock: ReactNode;
  if (pickedPreview) {
    imagePreviewBlock = (
      <div style={{ marginTop: 12 }}>
        <p className="text-muted small" style={{ marginBottom: 8 }}>
          <strong>New image</strong> (preview before save)
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element -- blob URL from file input */}
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
    );
  } else if (showImagePreview && initial.imageUrl) {
    imagePreviewBlock = (
      <div style={{ marginTop: 12 }}>
        <p className="text-muted small" style={{ marginBottom: 8 }}>
          Current image on server
        </p>
        <Image
          src={initial.imageUrl}
          alt=""
          width={120}
          height={120}
          style={{ objectFit: "cover", borderRadius: 4 }}
          unoptimized
        />
      </div>
    );
  } else {
    imagePreviewBlock = (
      <p className="text-muted" style={{ marginTop: 8 }}>
        No image on file. Choose a file to upload one.
      </p>
    );
  }

  function onFormSubmit(ev: SyntheticEvent<HTMLFormElement>) {
    const fd = new FormData(ev.currentTarget);
    const img = fd.get("image");
    if (img instanceof File && img.size > 0 && img.size > MAX_CATEGORY_IMAGE_BYTES) {
      ev.preventDefault();
      setImageFileError(getCategoryImageOversizeMessage(img));
    }
  }

  return (
    <form action={formAction} noValidate onSubmit={onFormSubmit}>
      <input type="hidden" name="id" value={initial.id} />

      <div className="box-body">
        <p className="text-muted" style={{ marginBottom: 16 }}>
          <strong>Slug:</strong> {initial.slug}{" "}
          <span className="small"> · </span>
          <strong>Status:</strong> {initial.status}
        </p>

        {parentsLoadWarning ? (
          <div className="alert alert-warning" role="alert">
            Could not load parent list: {parentsLoadWarning}.
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="edit-category-parent">Parent category</label>
          <select
            id="edit-category-parent"
            name="parentId"
            className="form-control"
            defaultValue={parentSelectValue}
          >
            <option value="">None (top-level)</option>
            {parentOptions.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.name}
              </option>
            ))}
          </select>
          {initial.parentId == null ? (
            <p className="help-block">
              If your API does not return <code>parentId</code>, this starts as
              top-level — change it only when you need to move under another
              category.
            </p>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="edit-category-name">
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="edit-category-name"
            name="name"
            type="text"
            className="form-control"
            defaultValue={initial.name}
            autoComplete="off"
            required
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-category-description">Description</label>
          <textarea
            id="edit-category-description"
            name="description"
            className="form-control"
            rows={4}
            defaultValue={initial.description}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-category-image">Image</label>
          <input
            id="edit-category-image"
            name="image"
            type="file"
            className="form-control"
            accept="image/*"
            onChange={onImagePicked}
          />
          <p className="help-block">
            Optional replacement image — max{" "}
            {formatMaxCategoryImageSizeShort()}. Leave empty to keep the current
            file on the server; after you choose a file, preview appears below.
          </p>
          {imageFileError ? (
            <p className="text-danger" role="alert" style={{ marginTop: 8 }}>
              {imageFileError}
            </p>
          ) : null}
          {imagePreviewBlock}
        </div>

        <div className="form-group">
          <label htmlFor="edit-category-meta-title">Meta title</label>
          <input
            id="edit-category-meta-title"
            name="metaTitle"
            type="text"
            className="form-control"
            defaultValue={initial.metaTitle ?? ""}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-category-meta-desc">Meta description</label>
          <textarea
            id="edit-category-meta-desc"
            name="metaDesc"
            className="form-control"
            rows={2}
            defaultValue={initial.metaDesc ?? ""}
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
