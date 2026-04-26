import Link from "next/link";

export type AdminPaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  /** Number of rows on the current page (e.g. `items.length`). */
  shownCount: number;
  previousPage: number | null;
  nextPage: number | null;
  /** Build URL for a 1-based page index (e.g. `(p) => \`/admin/foo?page=${p}\``). */
  hrefForPage: (page: number) => string;
  /** When there is only one page, still show the summary row. Default true. */
  showWhenSinglePage?: boolean;
  /** Max numbered page buttons (sliding window). Omit to hide numbered links. */
  maxNumericLinks?: number;
}>;

function visiblePageRange(
  current: number,
  total: number,
  max: number,
): number[] {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const half = Math.floor(max / 2);
  let start = current - half;
  if (start < 1) start = 1;
  let end = start + max - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - max + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

type PaginationListProps = Readonly<{
  previousPage: number | null;
  nextPage: number | null;
  hrefForPage: (page: number) => string;
  pageNumbers: number[];
  showNumeric: boolean;
  currentPage: number;
  totalPages: number;
}>;

/**
 * Bootstrap 3 horizontal pagination — one <ul>, no floats, works with AdminLTE.
 */
function PaginationList({
  previousPage,
  nextPage,
  hrefForPage,
  pageNumbers,
  showNumeric,
  currentPage,
  totalPages,
}: PaginationListProps) {
  const firstShown = pageNumbers.at(0) ?? 1;
  const lastShown = pageNumbers.at(-1) ?? totalPages;

  return (
    <ul
      className="pagination pagination-sm"
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "stretch",
      }}
      aria-label="Pagination"
    >
      <li className={previousPage === null ? "disabled" : undefined}>
        {previousPage === null ? (
          <span aria-disabled="true">Previous</span>
        ) : (
          <Link href={hrefForPage(previousPage)} rel="prev">
            Previous
          </Link>
        )}
      </li>

      {showNumeric && firstShown > 1 ? (
        <>
          <li>
            <Link href={hrefForPage(1)}>1</Link>
          </li>
          {firstShown > 2 ? (
            <li className="disabled">
              <span>…</span>
            </li>
          ) : null}
        </>
      ) : null}

      {showNumeric
        ? pageNumbers.map((p) =>
            p === currentPage ? (
              <li key={p} className="active" aria-current="page">
                <span>{p}</span>
              </li>
            ) : (
              <li key={p}>
                <Link href={hrefForPage(p)}>{p}</Link>
              </li>
            ),
          )
        : null}

      {showNumeric && lastShown < totalPages ? (
        <>
          {lastShown < totalPages - 1 ? (
            <li className="disabled">
              <span>…</span>
            </li>
          ) : null}
          <li>
            <Link href={hrefForPage(totalPages)}>{totalPages}</Link>
          </li>
        </>
      ) : null}

      <li className={nextPage === null ? "disabled" : undefined}>
        {nextPage === null ? (
          <span aria-disabled="true">Next</span>
        ) : (
          <Link href={hrefForPage(nextPage)} rel="next">
            Next
          </Link>
        )}
      </li>
    </ul>
  );
}

/**
 * Admin list footer: summary + Bootstrap horizontal pagination (AdminLTE-friendly).
 */
export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  perPage,
  shownCount,
  previousPage,
  nextPage,
  hrefForPage,
  showWhenSinglePage = true,
  maxNumericLinks,
}: AdminPaginationProps) {
  if (totalPages < 1) {
    return null;
  }

  if (totalPages === 1 && !showWhenSinglePage) {
    return null;
  }

  const showNumeric =
    maxNumericLinks != null && maxNumericLinks > 0 && totalPages > 1;
  const pageNumbers = showNumeric
    ? visiblePageRange(currentPage, totalPages, maxNumericLinks)
    : [];

  return (
    <div
      className="box-footer"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 16,
        rowGap: 10,
      }}
    >
      <div className="text-muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
        Showing <strong>{shownCount}</strong> of <strong>{totalCount}</strong>{" "}
        <span className="hidden-xs">
          ({perPage} per page) · Page {currentPage} of {totalPages}
        </span>
      </div>

      <div style={{ flexShrink: 0 }}>
        <PaginationList
          currentPage={currentPage}
          totalPages={totalPages}
          previousPage={previousPage}
          nextPage={nextPage}
          hrefForPage={hrefForPage}
          pageNumbers={pageNumbers}
          showNumeric={showNumeric}
        />
      </div>
    </div>
  );
}
