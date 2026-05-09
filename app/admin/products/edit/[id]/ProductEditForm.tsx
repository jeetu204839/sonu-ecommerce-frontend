"use client";

import type { SyntheticEvent } from "react";
import { useActionState, useCallback, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import { updateProductAction } from "@/app/admin/products/edit/[id]/actions";
import {
  syncCkeditorLongDescriptionToTextarea,
  useCkeditorLongDescription,
} from "@/app/admin/products/useCkeditorLongDescription";
import type { AdminAttributeRow } from "@/lib/admin/attribute/types";
import type { AdminCategoryParentPick } from "@/lib/admin/category/types";
import {
  editProductInitialState,
  type EditProductFormDraft,
  type EditProductFormState,
} from "@/lib/admin/product/edit-form-state";
import {
  mapAdminProductDetailToEditDraft,
  productDetailToAttrRowSeeds,
  type AdminProductAttrRowSeed,
} from "@/lib/admin/product/product-detail-form-map";
import type {
  AdminProductRow,
  ProductAttributeFormEntry,
} from "@/lib/admin/product/types";

declare global {
  interface Window {
    CKEDITOR?: {
      replace: (elementId: string, config?: Record<string, unknown>) => unknown;
      instances: Record<
        string,
        { destroy: (preserve?: boolean) => void; updateElement: () => void }
      >;
    };
  }
}

const LONG_DESCRIPTION_FIELD_ID = "product-long-description-edit";

const PRODUCT_STATUSES = ["ACTIVE", "INACTIVE", "DRAFT"] as const;
const VISIBILITY_OPTIONS = [
  "CATALOG_SEARCH",
  "CATALOG",
  "SEARCH",
  "HIDDEN",
] as const;
const STOCK_STATUSES = ["IN_STOCK", "OUT_OF_STOCK", "LOW_STOCK"] as const;

type AttrRow = { rowId: string; attributeId: string; value: string };

function newRowId(): string {
  if (
    typeof globalThis.crypto !== "undefined" &&
    "randomUUID" in globalThis.crypto
  ) {
    return globalThis.crypto.randomUUID();
  }
  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function newAttrRow(): AttrRow {
  return { rowId: newRowId(), attributeId: "", value: "" };
}

function seedsToAttrRows(seeds: AdminProductAttrRowSeed[]): AttrRow[] {
  if (!seeds.length) return [newAttrRow()];
  return seeds.map((s) => ({
    rowId: newRowId(),
    attributeId: s.attributeId,
    value: s.value,
  }));
}

type Props = Readonly<{
  productId: number;
  initialProduct: AdminProductRow;
  categoryOptions: AdminCategoryParentPick[];
  attributeOptions: AdminAttributeRow[];
  categoriesLoadWarning?: string;
  attributesLoadWarning?: string;
}>;

function FieldInlineError({ message }: Readonly<{ message?: string }>) {
  const m = message?.trim();
  if (!m) return null;
  return (
    <span className="text-danger" style={{ display: "block" }}>
      {" "}
      {m}
    </span>
  );
}

function apiFieldError(
  fieldErrors: Record<string, string> | undefined,
  path: string,
): string | undefined {
  if (!fieldErrors) return undefined;
  const direct = fieldErrors[path];
  if (direct) return direct;
  const prefixDot = `${path}.`;
  const prefixBracket = `${path}[`;
  for (const [k, v] of Object.entries(fieldErrors)) {
    if (k.startsWith(prefixDot) || k.startsWith(prefixBracket)) return v;
  }
  return undefined;
}

function apiAttributeErrors(
  fieldErrors: Record<string, string> | undefined,
): string[] {
  if (!fieldErrors) return [];
  const msgs: string[] = [];
  const seen = new Set<string>();
  for (const [k, v] of Object.entries(fieldErrors)) {
    if (
      k === "attributes" ||
      k.startsWith("attributes.") ||
      k.startsWith("attributes[")
    ) {
      const t = v.trim();
      if (t !== "" && !seen.has(t)) {
        seen.add(t);
        msgs.push(v);
      }
    }
  }
  return msgs;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

export default function ProductEditForm({
  productId,
  initialProduct,
  categoryOptions,
  attributeOptions,
  categoriesLoadWarning,
  attributesLoadWarning,
}: Props) {
  const runUpdate = useCallback(
    (prev: EditProductFormState, formData: FormData) =>
      updateProductAction(productId, prev, formData),
    [productId],
  );

  const [state, formAction] = useActionState<
    EditProductFormState,
    FormData
  >(runUpdate, editProductInitialState);

  const apiFieldErrors =
    state.ok === false ? state.fieldErrors : undefined;
  const orphanErrorMessage =
    state.ok === false &&
    state.message.trim() !== "" &&
    (!apiFieldErrors || Object.keys(apiFieldErrors).length === 0)
      ? state.message.trim()
      : "";

  const [attrRows, setAttrRows] = useState<AttrRow[]>(() =>
    seedsToAttrRows(productDetailToAttrRowSeeds(initialProduct)),
  );

  const [fields, setFields] = useState<EditProductFormDraft>(() =>
    mapAdminProductDetailToEditDraft(initialProduct),
  );
  const [longDescNonce, setLongDescNonce] = useState(0);

  function patchFields(patch: Partial<EditProductFormDraft>) {
    setFields((prev) => ({ ...prev, ...patch }));
  }

  useEffect(() => {
    setFields(mapAdminProductDetailToEditDraft(initialProduct));
    setAttrRows(seedsToAttrRows(productDetailToAttrRowSeeds(initialProduct)));
    setLongDescNonce((n) => n + 1);
  }, [initialProduct.id]);

  const attributesJson = useMemo(() => {
    const compact: ProductAttributeFormEntry[] = [];
    for (const row of attrRows) {
      const id = Number.parseInt(row.attributeId, 10);
      const value = row.value.trim();
      if (!Number.isFinite(id) || id < 1 || value === "") continue;
      compact.push({ attributeId: id, value });
    }
    return JSON.stringify(compact);
  }, [attrRows]);

  useEffect(() => {
    if (state.ok || !state.draft) return;
    setFields(state.draft);
    setLongDescNonce((n) => n + 1);
    try {
      const raw = JSON.parse(state.draft.attributesJson) as unknown;
      if (Array.isArray(raw) && raw.length > 0) {
        const rows: AttrRow[] = [];
        for (const item of raw) {
          if (!item || typeof item !== "object") continue;
          rows.push({
            rowId: newRowId(),
            attributeId: String(
              (item as { attributeId?: unknown }).attributeId ?? "",
            ),
            value: String((item as { value?: unknown }).value ?? ""),
          });
        }
        const nonempty = rows.filter(
          (r) => r.attributeId.trim() !== "" || r.value.trim() !== "",
        );
        if (nonempty.length > 0) {
          setAttrRows(nonempty);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setAttrRows([newAttrRow()]);
  }, [state]);

  useCkeditorLongDescription(LONG_DESCRIPTION_FIELD_ID, longDescNonce);

  function syncCkeditorToTextarea() {
    syncCkeditorLongDescriptionToTextarea(LONG_DESCRIPTION_FIELD_ID);
  }

  function onFormSubmit(_e: SyntheticEvent<HTMLFormElement>) {
    syncCkeditorToTextarea();
  }

  function addAttrRow() {
    setAttrRows((rows) => [...rows, newAttrRow()]);
  }

  function removeAttrRow(index: number) {
    setAttrRows((rows) => rows.filter((_, i) => i !== index));
  }

  function setAttrRow(
    index: number,
    patch: Partial<Pick<AttrRow, "attributeId" | "value">>,
  ) {
    setAttrRows((rows) =>
      rows.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  return (
    <form action={formAction} noValidate onSubmit={onFormSubmit}>
      <input type="hidden" name="attributesJson" value={attributesJson} />

      <div className="box-body">
        {orphanErrorMessage !== "" ? (
          <p className="text-danger" style={{ marginBottom: 12 }} role="alert">
            {orphanErrorMessage}
          </p>
        ) : null}

        {categoriesLoadWarning ? (
          <div className="alert alert-warning" role="alert">
            Categories: {categoriesLoadWarning}
          </div>
        ) : null}
        {attributesLoadWarning ? (
          <div className="alert alert-warning" role="alert">
            Attributes list: {attributesLoadWarning}. You can still submit without
            attribute rows.
          </div>
        ) : null}

        <h4>Basic</h4>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-edit-name">
                {" "}
                Name <span className="text-danger">*</span>{" "}
              </label>
              <input
                id="product-edit-name"
                name="name"
                type="text"
                className="form-control"
                placeholder="Product name"
                value={fields.name}
                onChange={(e) => patchFields({ name: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "name")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-edit-sku">
                {" "}
                SKU <span className="text-danger">*</span>{" "}
              </label>
              <input
                id="product-edit-sku"
                name="sku"
                type="text"
                className="form-control"
                placeholder="TS-1005"
                value={fields.sku}
                onChange={(e) => patchFields({ sku: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "sku")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="product-edit-slug">
                Slug <span className="text-danger">*</span>
              </label>
              <input
                id="product-edit-slug"
                name="slug"
                type="text"
                className="form-control"
                placeholder="url-friendly-slug"
                value={fields.slug}
                onChange={(e) => patchFields({ slug: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "slug")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-edit-category">
                {" "}
                Category <span className="text-danger">*</span>{" "}
              </label>
              <select
                id="product-edit-category"
                name="categoryId"
                className="form-control"
                value={fields.categoryId}
                onChange={(e) => patchFields({ categoryId: e.target.value })}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categoryOptions.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {" "}
                    {c.name}{" "}
                  </option>
                ))}
              </select>
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "categoryId")}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-edit-vendor-id">Vendor ID</label>
              <input
                id="product-edit-vendor-id"
                name="vendorId"
                type="number"
                className="form-control"
                min={1}
                step={1}
                value={fields.vendorId}
                onChange={(e) => patchFields({ vendorId: e.target.value })}
              />
              <p className="help-block">
                Shown from the loaded product — change only if your API expects a
                different vendor on update.
              </p>
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "vendorId")}
              />
            </div>
          </div>
        </div>

        <h4>Pricing & inventory</h4>
        <hr />

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-mrp">MRP</label>
              <input
                id="product-edit-mrp"
                name="mrp"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                value={fields.mrp}
                onChange={(e) => patchFields({ mrp: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "mrp")}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-price">Price</label>
              <input
                id="product-edit-price"
                name="price"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                value={fields.price}
                onChange={(e) => patchFields({ price: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "price")}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-discount">Discount %</label>
              <input
                id="product-edit-discount"
                name="discountPercent"
                type="number"
                className="form-control"
                min={0}
                max={100}
                step={0.1}
                value={fields.discountPercent}
                onChange={(e) =>
                  patchFields({ discountPercent: e.target.value })
                }
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "discountPercent")}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-stock">Stock</label>
              <input
                id="product-edit-stock"
                name="stock"
                type="number"
                className="form-control"
                min={0}
                step={1}
                value={fields.stock}
                onChange={(e) => patchFields({ stock: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "stock")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="product-edit-stock-status">Stock status</label>
              <select
                id="product-edit-stock-status"
                name="stockStatus"
                className="form-control"
                value={fields.stockStatus}
                onChange={(e) => patchFields({ stockStatus: e.target.value })}
              >
                {STOCK_STATUSES.map((v) => (
                  <option key={v} value={v}>
                    {" "}
                    {v}{" "}
                  </option>
                ))}
              </select>
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "stockStatus")}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="product-edit-status">Status</label>
              <select
                id="product-edit-status"
                name="status"
                className="form-control"
                value={fields.status}
                onChange={(e) => patchFields({ status: e.target.value })}
              >
                {PRODUCT_STATUSES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "status")}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="product-edit-visibility">Visibility</label>
              <select
                id="product-edit-visibility"
                name="visibility"
                className="form-control"
                value={fields.visibility}
                onChange={(e) => patchFields({ visibility: e.target.value })}
              >
                {VISIBILITY_OPTIONS.map((v) => (
                  <option key={v} value={v}>
                    {" "}
                    {v}{" "}
                  </option>
                ))}
              </select>
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "visibility")}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="product-edit-featured" className="checkbox-inline">
            <input
              id="product-edit-featured"
              name="isFeatured"
              type="checkbox"
              value="true"
              checked={fields.isFeatured}
              onChange={(e) => patchFields({ isFeatured: e.target.checked })}
              data-no-icheck
            />{" "}
            Featured
          </label>
          <FieldInlineError
            message={apiFieldError(apiFieldErrors, "isFeatured")}
          />
        </div>

        <h4 style={{ marginTop: 20 }}>Dimensions & weight</h4>
        <hr />

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-weight">Weight</label>
              <input
                id="product-edit-weight"
                name="weight"
                type="number"
                className="form-control"
                min={0}
                step={0.001}
                value={fields.weight}
                onChange={(e) => patchFields({ weight: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "weight")}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-weight-unit">Weight unit</label>
              <input
                id="product-edit-weight-unit"
                name="weightUnit"
                type="text"
                className="form-control"
                maxLength={16}
                value={fields.weightUnit}
                onChange={(e) => patchFields({ weightUnit: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "weightUnit")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-length">Length</label>
              <input
                id="product-edit-length"
                name="length"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                value={fields.length}
                onChange={(e) => patchFields({ length: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "length")}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-length-unit">Length unit</label>
              <input
                id="product-edit-length-unit"
                name="lengthUnit"
                type="text"
                className="form-control"
                maxLength={16}
                value={fields.lengthUnit}
                onChange={(e) => patchFields({ lengthUnit: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "lengthUnit")}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-width">Width</label>
              <input
                id="product-edit-width"
                name="width"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                value={fields.width}
                onChange={(e) => patchFields({ width: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "width")}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-width-unit">Width unit</label>
              <input
                id="product-edit-width-unit"
                name="widthUnit"
                type="text"
                className="form-control"
                maxLength={16}
                value={fields.widthUnit}
                onChange={(e) => patchFields({ widthUnit: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "widthUnit")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-height">Height</label>
              <input
                id="product-edit-height"
                name="height"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                value={fields.height}
                onChange={(e) => patchFields({ height: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "height")}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-edit-height-unit">Height unit</label>
              <input
                id="product-edit-height-unit"
                name="heightUnit"
                type="text"
                className="form-control"
                maxLength={16}
                value={fields.heightUnit}
                onChange={(e) => patchFields({ heightUnit: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "heightUnit")}
              />
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>Descriptions</h4>
        <hr />

        <div className="form-group">
          <label htmlFor="product-edit-short-description">
            Short description
          </label>
          <textarea
            id="product-edit-short-description"
            name="shortDescription"
            className="form-control"
            rows={3}
            placeholder="Short summary"
            value={fields.shortDescription}
            onChange={(e) => patchFields({ shortDescription: e.target.value })}
          />
          <FieldInlineError
            message={apiFieldError(apiFieldErrors, "shortDescription")}
          />
        </div>

        <div className="box box-info" style={{ marginBottom: 16 }}>
          <div className="box-header">
            <h3 className="box-title">
              CK Editor <small>Advanced and full of features</small>
            </h3>
          </div>
          <div className="box-body pad">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="sr-only" htmlFor={LONG_DESCRIPTION_FIELD_ID}>
                Long description
              </label>
              <textarea
                key={`long-desc-${longDescNonce}`}
                id={LONG_DESCRIPTION_FIELD_ID}
                name="longDescription"
                rows={10}
                cols={80}
                placeholder="Long product description (HTML supported)"
                defaultValue={fields.longDescription}
              />
              <p className="help-block" style={{ marginTop: 12, marginBottom: 0 }}>
                Self-hosted from <code>/admin/js/plugins/ckeditor/</code> (no CDN).
              </p>
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "longDescription")}
              />
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>SEO</h4>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-edit-meta-title">Meta title</label>
              <input
                id="product-edit-meta-title"
                name="metaTitle"
                type="text"
                className="form-control"
                placeholder="Meta title"
                value={fields.metaTitle}
                onChange={(e) => patchFields({ metaTitle: e.target.value })}
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "metaTitle")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-edit-meta-description">
                Meta description
              </label>
              <textarea
                id="product-edit-meta-description"
                name="metaDescription"
                className="form-control"
                rows={2}
                placeholder="Meta description"
                value={fields.metaDescription}
                onChange={(e) =>
                  patchFields({ metaDescription: e.target.value })
                }
              />
              <FieldInlineError
                message={apiFieldError(apiFieldErrors, "metaDescription")}
              />
            </div>
          </div>
        </div>

        <h4>Attributes</h4>
        {apiAttributeErrors(apiFieldErrors).map((msg) => (
          <FieldInlineError key={msg} message={msg} />
        ))}
        <hr />

        <table className="table table-condensed">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Attribute</th>
              <th style={{ width: "45%" }}>Value</th>
              <th style={{ width: "15%" }} />
            </tr>
          </thead>
          <tbody>
            {attrRows.map((row, index) => (
              <tr key={row.rowId}>
                <td>
                  <select
                    className="form-control"
                    value={row.attributeId}
                    onChange={(e) =>
                      setAttrRow(index, { attributeId: e.target.value })
                    }
                    aria-label={`Attribute ${index + 1}`}
                  >
                    <option value="">Select attribute</option>
                    {attributeOptions.map((a) => (
                      <option key={a.id} value={String(a.id)}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.value}
                    onChange={(e) =>
                      setAttrRow(index, { value: e.target.value })
                    }
                    placeholder="e.g. 2KG, Small"
                    aria-label={`Attribute value ${index + 1}`}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-default btn-sm"
                    onClick={() => removeAttrRow(index)}
                    disabled={attrRows.length <= 1}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-default btn-sm"
          onClick={addAttrRow}
        >
          Add attribute row
        </button>
      </div>

      <div className="box-footer">
        <SubmitButton />
      </div>
    </form>
  );
}
