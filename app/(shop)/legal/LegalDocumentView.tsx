import Link from "next/link";

import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WEBSITE,
} from "@/app/(shop)/contact/contact-data";

import { LEGAL_PAGE_LINKS, type LegalDocument } from "./legal-types";

type Props = Readonly<{
  document: LegalDocument;
}>;

export default function LegalDocumentView({ document }: Props) {
  return (
    <div className="container py-5 legal-page">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {document.title}
          </li>
        </ol>
      </nav>

      <div className="row g-4 g-lg-5">
        <div className="col-lg-8">
          <header className="legal-page-header mb-4">
            <h1 className="legal-page-title">{document.title}</h1>
            <p className="legal-page-meta text-secondary mb-0">
              Last updated: {document.lastUpdated}
            </p>
          </header>

          <div className="legal-page-body">
            {document.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section"
                aria-labelledby={`${section.id}-heading`}
              >
                <h2 id={`${section.id}-heading`} className="legal-section-title">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="legal-section-text">
                    {paragraph}
                  </p>
                ))}
                {section.list?.length ? (
                  <ul className="legal-section-list">
                    {section.list.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <aside className="col-lg-4">
          <div className="legal-sidebar card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="h6 text-primary mb-3">Related policies</h2>
              <ul className="list-unstyled legal-sidebar-links mb-4">
                {LEGAL_PAGE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        link.href === `/${document.slug}`
                          ? "legal-sidebar-link is-active"
                          : "legal-sidebar-link"
                      }
                      aria-current={
                        link.href === `/${document.slug}` ? "page" : undefined
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="h6 text-primary mb-3">Need help?</h2>
              <p className="small text-secondary mb-2">
                For questions about these policies or your order, contact our team.
              </p>
              <ul className="list-unstyled small text-secondary mb-3">
                <li className="mb-1">
                  <i className="fas fa-phone-alt me-2 text-primary" aria-hidden="true" />
                  {CONTACT_PHONE}
                </li>
                <li className="mb-1">
                  <i className="fas fa-envelope me-2 text-primary" aria-hidden="true" />
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                <li>
                  <i className="fas fa-globe me-2 text-primary" aria-hidden="true" />
                  {CONTACT_WEBSITE.replace(/^https:\/\//, "")}
                </li>
              </ul>
              <Link href="/contact" className="btn btn-primary btn-sm rounded-pill px-3">
                Contact us
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
