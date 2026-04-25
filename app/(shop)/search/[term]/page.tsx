import { fetchProductSearchPage } from "@/lib/api/products";

import SearchResultsView from "../SearchResultsView";

type PageProps = Readonly<{
  params: Promise<{ term: string }>;
  searchParams: Promise<{ page?: string }>;
}>;

export default async function SearchResultsPage({
  params,
  searchParams,
}: PageProps) {
  const p = await params;
  const sp = await searchParams;
  const term = decodeURIComponent(p.term ?? "").trim();
  const pageRaw = sp.page?.trim() ?? "1";
  const page = Math.max(1, Number.parseInt(pageRaw, 10) || 1);

  const data = await fetchProductSearchPage({
    page,
    searchTerm: term,
  });

  const resultBasePath = `/search/${encodeURIComponent(term)}`;

  return (
    <SearchResultsView term={term} resultBasePath={resultBasePath} data={data} />
  );
}
