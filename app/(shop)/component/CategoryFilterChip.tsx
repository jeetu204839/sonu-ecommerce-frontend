import Link from "next/link";

type CategoryFilterChipProps = Readonly<{
  href: string;
  label: string;
  count?: number;
  active?: boolean;
  scroll?: boolean;
}>;

export default function CategoryFilterChip({
  href,
  label,
  count,
  active,
  scroll = true,
}: CategoryFilterChipProps) {
  return (
    <Link
      href={href}
      scroll={scroll}
      className={`shop-category-chip${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <span className="shop-category-chip-label">{label}</span>
      {count === undefined ? null : (
        <span className="shop-category-chip-count">{count}</span>
      )}
    </Link>
  );
}
