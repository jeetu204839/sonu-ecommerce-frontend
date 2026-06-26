"use client";

import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";

type Props = Readonly<{
  open: boolean;
  title?: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "danger" | "primary";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}>;

function lockBodyScroll(active: boolean) {
  const body = document.body;
  if (active) {
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    body.dataset.adminConfirmScrollLock = "1";
    body.style.overflow = "hidden";
    if (gutter > 0) {
      body.style.paddingRight = `${gutter}px`;
    }
    return;
  }

  if (body.dataset.adminConfirmScrollLock !== "1") return;
  delete body.dataset.adminConfirmScrollLock;
  body.style.overflow = "";
  body.style.paddingRight = "";
}

export default function AdminConfirmDialog({
  open,
  title = "Confirm",
  message,
  confirmLabel = "Yes, delete",
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  const titleId = useId();
  const messageId = useId();
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lockBodyScroll(open);
    return () => lockBodyScroll(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || loading) return;

    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        ev.preventDefault();
        onCancel();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, loading, onCancel]);

  if (!open) return null;

  const confirmBtnClass =
    confirmVariant === "primary" ? "btn btn-primary" : "btn btn-danger";

  return (
    <>
      <div
        className="modal fade in"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        tabIndex={-1}
        style={{ display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                aria-label="Close"
                disabled={loading}
                onClick={onCancel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id={titleId}>
                <i className="fa fa-warning text-warning" aria-hidden="true" />{" "}
                {title}
              </h4>
            </div>

            <div className="modal-body" id={messageId}>
              {message}
            </div>

            <div className="modal-footer clearfix">
              <button
                type="button"
                className="btn btn-default pull-left"
                disabled={loading}
                onClick={onCancel}
              >
                {cancelLabel}
              </button>
              <button
                ref={confirmRef}
                type="button"
                className={confirmBtnClass}
                disabled={loading}
                onClick={onConfirm}
              >
                {loading ? (
                  <>
                    <i className="fa fa-spinner fa-spin" aria-hidden="true" />{" "}
                    Deleting…
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade in"
        role="presentation"
        onClick={loading ? undefined : onCancel}
      />
    </>
  );
}
