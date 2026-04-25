import { fetchProductSearchPage } from "@/lib/api/products";

import SearchResultsView from "./SearchResultsView";

type PageProps = Readonly<{
  searchParams: Promise<{ page?: string }>;
}>;

export default async function SearchLandingPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const pageRaw = sp.page?.trim() ?? "1";
  const page = Math.max(1, Number.parseInt(pageRaw, 10) || 1);

  const data = await fetchProductSearchPage({
    page,
    searchTerm: "",
  });

  return (
    <SearchResultsView term="" resultBasePath="/search" data={data} />
  );
}
