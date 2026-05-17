import Link from "next/link";

import { leadModuleRoutes, type LeadModuleSection } from "./format";

const SECTIONS: ReadonlyArray<{
  id: LeadModuleSection;
  href: string;
  label: string;
  icon: string;
}> = [
  {
    id: "dashboard",
    href: leadModuleRoutes.dashboard,
    label: "Dashboard",
    icon: "fa-line-chart",
  },
  {
    id: "daily",
    href: leadModuleRoutes.daily,
    label: "Daily reviews",
    icon: "fa-list",
  },
  {
    id: "productStats",
    href: leadModuleRoutes.productStats,
    label: "Product stats",
    icon: "fa-bar-chart",
  },
  {
    id: "scoredLeads",
    href: leadModuleRoutes.scoredLeads,
    label: "Scored leads",
    icon: "fa-users",
  },
];

type Props = Readonly<{
  active?: LeadModuleSection;
}>;

export default function LeadModuleToolbar({ active }: Props) {
  return (
    <div className="lead-module-toolbar clearfix mb-3">
      <div className="btn-group pull-right" role="navigation" aria-label="Leads sections">
        {SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className={`btn btn-sm ${
              active === section.id ? "btn-primary" : "btn-default"
            }`}
          >
            <i className={`fa ${section.icon} margin-r-5`} />
            {section.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
