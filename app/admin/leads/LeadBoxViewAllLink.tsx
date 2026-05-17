import Link from "next/link";

type Props = Readonly<{
  href: string;
  label: string;
}>;

export default function LeadBoxViewAllLink({ href, label }: Props) {
  return (
    <div className="box-footer text-right">
      <Link href={href}>
        {label} <i className="fa fa-arrow-right" />
      </Link>
    </div>
  );
}
