type AdminLoaderVisualProps = Readonly<{
  /**
   * `overlay` — used while navigating / client API work.
   * `inline` — used by route `loading.tsx` (same look).
   */
  variant: "overlay" | "inline";
}>;

/**
 * Centered loader only — no full-page white veil. The page stays visible and
 * does not reflow; outer layer uses `pointer-events: none` so the layout is
 * untouched except for a small floating card with the spinner.
 */
export default function AdminLoaderVisual({ variant }: AdminLoaderVisualProps) {
  const cardShadow =
    variant === "overlay"
      ? "0 4px 24px rgba(0, 0, 0, 0.12)"
      : "0 2px 16px rgba(0, 0, 0, 0.1)";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="admin-global-loader-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10050,
        margin: 0,
        padding: 0,
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        className="text-center admin-global-loader-card"
        style={{
          pointerEvents: "auto",
          background: "#fff",
          padding: "22px 32px",
          borderRadius: 8,
          boxShadow: cardShadow,
          border: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <i
          className="fa fa-spinner fa-spin fa-3x"
          style={{ color: "#3c8dbc" }}
          aria-hidden="true"
        />
        <p className="text-muted" style={{ marginTop: 14, marginBottom: 0 }}>
          Loading…
        </p>
      </div>
    </div>
  );
}
