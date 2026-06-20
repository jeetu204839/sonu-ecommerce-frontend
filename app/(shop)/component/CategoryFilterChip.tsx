import Link from "next/link";
import Image from "next/image";

type CategoryFilterChipProps = Readonly<{
  href: string;
  label: string;
  count?: number;
  active?: boolean;
  scroll?: boolean;
  imageSrc?: string | null;
}>;

export default function CategoryFilterChip({
  href,
  label,
  count,
  active,
  scroll = true,
  imageSrc,
}: CategoryFilterChipProps) {
  return (
    <Link
      href={href}
      scroll={scroll}
      className={`shop-category-chip${active ? " is-active" : ""}${
        imageSrc ? " shop-category-chip--has-img" : ""
      }`}
      aria-current={active ? "page" : undefined}
    >
      {imageSrc ? (
        // <img src={imageSrc} alt="" className="shop-category-chip-img" />
        <Image
          src={imageSrc}
          alt="category chip image"
          width={60}
          height={60}
          className="shop-category-chip-img"
        />
      ) : null}
      <span className="shop-category-chip-label">{label}</span>
      {count === undefined ? null : (
        <span className="shop-category-chip-count">{count}</span>
      )}
    </Link>
  );
}
