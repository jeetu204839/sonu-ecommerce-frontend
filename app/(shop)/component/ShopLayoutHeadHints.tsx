import { MEDIA_BASE_URL } from "@/lib/config";

function mediaOrigin(): string | null {
  if (!MEDIA_BASE_URL) return null;
  try {
    return new URL(MEDIA_BASE_URL).origin;
  } catch {
    return null;
  }
}

/** Early connection hints for LCP images served from the media CDN/API host. */
export default function ShopLayoutHeadHints() {
  const origin = mediaOrigin();
  if (!origin) return null;

  return (
    <>
      <link rel="preconnect" href={origin} crossOrigin="anonymous" />
      <link rel="dns-prefetch" href={origin} />
    </>
  );
}
