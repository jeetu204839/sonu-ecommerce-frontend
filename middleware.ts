import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DOWN_PATH = "/service-unavailable";

/** Lightweight public endpoint used only to detect reachability. */
function healthCheckUrl(): string | null {
  const raw =
    process.env.API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) return null;
  const base = raw.replace(/\/+$/, "");
  return `${base}/public/categories`;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === DOWN_PATH ||
    pathname.startsWith(`${DOWN_PATH}/`) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  if (
    /\.(?:ico|png|jpg|jpeg|gif|webp|svg|css|js|woff2?|map|txt|xml|json)$/i.test(
      pathname,
    )
  ) {
    return NextResponse.next();
  }

  const url = healthCheckUrl();
  if (!url) {
    return NextResponse.next();
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!res.ok && res.status >= 500) {
      return NextResponse.redirect(new URL(DOWN_PATH, request.url));
    }
  } catch {
    return NextResponse.redirect(new URL(DOWN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
