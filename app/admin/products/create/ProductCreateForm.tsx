"use client";

import type { SyntheticEvent } from "react";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import { createProductAction } from "@/app/admin/products/create/actions";
import type { AdminAttributeRow } from "@/lib/admin/attribute/types";
import type { AdminCategoryParentPick } from "@/lib/admin/category/types";
import {
  createProductInitialState,
  type CreateProductFormState,
} from "@/lib/admin/product/create-form-state";
import type { ProductAttributeFormEntry } from "@/lib/admin/product/types";

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

/** Must match textarea `id` — `CKEDITOR.replace(id)` like editors.html */
const LONG_DESCRIPTION_FIELD_ID = "product-long-description";

const PRODUCT_STATUSES = ["ACTIVE", "INACTIVE", "DRAFT"] as const;
const VISIBILITY_OPTIONS = [
  "CATALOG_SEARCH",
  "CATALOG",
  "SEARCH",
  "HIDDEN",
] as const;
const STOCK_STATUSES = ["IN_STOCK", "OUT_OF_STOCK", "LOW_STOCK"] as const;

type AttrRow = { attributeId: string; value: string };

type Props = Readonly<{
  categoryOptions: AdminCategoryParentPick[];
  attributeOptions: AdminAttributeRow[];
  categoriesLoadWarning?: string;
  attributesLoadWarning?: string;
}>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Create product"}
    </button>
  );
}

export default function ProductCreateForm({
  categoryOptions,
  attributeOptions,
  categoriesLoadWarning,
  attributesLoadWarning,
}: Props) {
  const [state, formAction] = useActionState<
    CreateProductFormState,
    FormData
  >(createProductAction, createProductInitialState);

  const showError = !state.ok && state.message.trim() !== "";

  const [attrRows, setAttrRows] = useState<AttrRow[]>([
    { attributeId: "", value: "" },
  ]);

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
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    function replaceEditor(): boolean {
      if (cancelled) return true;
      const CK = window.CKEDITOR;
      if (!CK) return false;
      if (CK.instances[LONG_DESCRIPTION_FIELD_ID]) return true;
      const el = document.getElementById(LONG_DESCRIPTION_FIELD_ID);
      if (!el) return false;
      CK.replace(LONG_DESCRIPTION_FIELD_ID, {
        height: 320,
        // SCAYT / WebSpellChecker contact external services; not needed for local trusted admin use.
        removePlugins: "scayt,wsc",
      });
      return true;
    }

    if (replaceEditor()) {
      return () => {
        cancelled = true;
        const inst = window.CKEDITOR?.instances?.[LONG_DESCRIPTION_FIELD_ID];
        if (inst) {
          try {
            inst.destroy(true);
          } catch {
            /* ignore */
          }
        }
      };
    }

    intervalId = setInterval(() => {
      if (replaceEditor() && intervalId !== undefined) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    }, 50);

    return () => {
      cancelled = true;
      if (intervalId !== undefined) clearInterval(intervalId);
      const inst = window.CKEDITOR?.instances?.[LONG_DESCRIPTION_FIELD_ID];
      if (inst) {
        try {
          inst.destroy(true);
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  function syncCkeditorToTextarea() {
    window.CKEDITOR?.instances?.[LONG_DESCRIPTION_FIELD_ID]?.updateElement();
  }

  function onFormSubmit(_e: SyntheticEvent<HTMLFormElement>) {
    syncCkeditorToTextarea();
  }

  function addAttrRow() {
    setAttrRows((rows) => [...rows, { attributeId: "", value: "" }]);
  }

  function removeAttrRow(index: number) {
    setAttrRows((rows) => rows.filter((_, i) => i !== index));
  }

  function setAttrRow(index: number, patch: Partial<AttrRow>) {
    setAttrRows((rows) =>
      rows.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  return (
    <form action={formAction} noValidate onSubmit={onFormSubmit}>
      <input type="hidden" name="attributesJson" value={attributesJson} />

      <div className="box-body">
        <p className="text-muted">
          Payload aligns with product API entities (identity, pricing, inventory,
          dimensions, publishing flags, SEO text, category relation, attribute rows).
        </p>

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

        <h4 style={{ marginTop: 8 }}>Basic</h4>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-name">
                Name <span className="text-danger">*</span>
              </label>
              <input
                id="product-name"
                name="name"
                type="text"
                className="form-control"
                placeholder="Product name"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-sku">
                SKU <span className="text-danger">*</span>
              </label>
              <input
                id="product-sku"
                name="sku"
                type="text"
                className="form-control"
                placeholder="TS-1005"
                required
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-category">
                Category <span className="text-danger">*</span>
              </label>
              <select
                id="product-category"
                name="categoryId"
                className="form-control"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                {categoryOptions.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-vendor-id">Vendor ID</label>
              <input
                id="product-vendor-id"
                name="vendorId"
                type="number"
                className="form-control"
                min={1}
                step={1}
                defaultValue={1}
              />
              <p className="help-block">
                Defaults to 1; override if your catalog uses another vendor id.
              </p>
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>Pricing & inventory</h4>
        <hr />

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-mrp">MRP</label>
              <input
                id="product-mrp"
                name="mrp"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                defaultValue={0}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-price">Price</label>
              <input
                id="product-price"
                name="price"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                defaultValue={0}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-discount">Discount %</label>
              <input
                id="product-discount"
                name="discountPercent"
                type="number"
                className="form-control"
                min={0}
                max={100}
                step={0.1}
                defaultValue={0}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-stock">Stock</label>
              <input
                id="product-stock"
                name="stock"
                type="number"
                className="form-control"
                min={0}
                step={1}
                defaultValue={0}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="product-stock-status">Stock status</label>
              <select
                id="product-stock-status"
                name="stockStatus"
                className="form-control"
                defaultValue={STOCK_STATUSES[0]}
              >
                {STOCK_STATUSES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="product-status">Status</label>
              <select
                id="product-status"
                name="status"
                className="form-control"
                defaultValue={PRODUCT_STATUSES[0]}
              >
                {PRODUCT_STATUSES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="product-visibility">Visibility</label>
              <select
                id="product-visibility"
                name="visibility"
                className="form-control"
                defaultValue={VISIBILITY_OPTIONS[0]}
              >
                {VISIBILITY_OPTIONS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="product-featured" className="checkbox-inline">
            <input
              id="product-featured"
              name="isFeatured"
              type="checkbox"
              value="true"
              data-no-icheck
            />{" "}
            Featured
          </label>
        </div>

        <h4 style={{ marginTop: 20 }}>Dimensions & weight</h4>
        <hr />

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-weight">Weight</label>
              <input
                id="product-weight"
                name="weight"
                type="number"
                className="form-control"
                min={0}
                step={0.001}
                defaultValue={0}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-weight-unit">Weight unit</label>
              <input
                id="product-weight-unit"
                name="weightUnit"
                type="text"
                className="form-control"
                defaultValue="kg"
                maxLength={16}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-length">Length</label>
              <input
                id="product-length"
                name="length"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                defaultValue={0}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-length-unit">Length unit</label>
              <input
                id="product-length-unit"
                name="lengthUnit"
                type="text"
                className="form-control"
                defaultValue="cm"
                maxLength={16}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-width">Width</label>
              <input
                id="product-width"
                name="width"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                defaultValue={0}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-width-unit">Width unit</label>
              <input
                id="product-width-unit"
                name="widthUnit"
                type="text"
                className="form-control"
                defaultValue="cm"
                maxLength={16}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-height">Height</label>
              <input
                id="product-height"
                name="height"
                type="number"
                className="form-control"
                min={0}
                step={0.01}
                defaultValue={0}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="product-height-unit">Height unit</label>
              <input
                id="product-height-unit"
                name="heightUnit"
                type="text"
                className="form-control"
                defaultValue="cm"
                maxLength={16}
              />
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>Descriptions</h4>
        <hr />

        <div className="form-group">
          <label htmlFor="product-short-description">Short description</label>
          <textarea
            id="product-short-description"
            name="shortDescription"
            className="form-control"
            rows={3}
            placeholder="Short summary"
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
                id={LONG_DESCRIPTION_FIELD_ID}
                name="longDescription"
                rows={10}
                cols={80}
                placeholder="Long product description (HTML supported)"
              />
              <p className="help-block" style={{ marginTop: 12, marginBottom: 0 }}>
                Self-hosted from <code>/admin/js/plugins/ckeditor/</code> (no CDN).
                Spell-check cloud plugins (SCAYT/WSC) are disabled in config.
              </p>
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>SEO</h4>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-meta-title">Meta title</label>
              <input
                id="product-meta-title"
                name="metaTitle"
                type="text"
                className="form-control"
                placeholder="Meta title"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="product-meta-description">Meta description</label>
              <textarea
                id="product-meta-description"
                name="metaDescription"
                className="form-control"
                rows={2}
                placeholder="Meta description"
              />
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>Attributes</h4>
        <hr />
        <p className="help-block">
          API shape: each product attribute links an <code>attributeId</code> to a
          chosen value label (e.g. &quot;2KG&quot;). Option ids are not loaded here —
          send labels your API expects or extend this form when option lists exist.
        </p>

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
              <tr key={`${index}-${row.attributeId}-${row.value.slice(0, 24)}`}>
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
                    placeholder='e.g. 2KG, Small'
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

        {showError ? (
          <div className="alert alert-danger" style={{ marginTop: 16 }} role="alert">
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
