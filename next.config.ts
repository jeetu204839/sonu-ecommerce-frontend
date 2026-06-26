import type { NextConfig } from "next";

/**
 * Shop OTP and other browser fetch calls need NEXT_PUBLIC_API_BASE_URL.
 * If only API_BASE_URL is set in .env.local, expose it to the client bundle here.
 */
function resolvedPublicApiBaseUrl(): string {
  const pub = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  const server = process.env.API_BASE_URL?.trim();
  const raw = pub || server || "";
  return raw.replace(/\/+$/, "");
}

function remotePatternsFromEnv(): NonNullable<
  NextConfig["images"]
>["remotePatterns"] extends infer T
  ? NonNullable<T>
  : never {
  const base =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  if (!base.trim()) return [];
  try {
    const u = new URL(base);
    const protocol = u.protocol.replace(":", "") as "http" | "https";
    return [
      {
        protocol,
        hostname: u.hostname,
        ...(u.port ? { port: u.port } : {}),
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_API_BASE_URL: resolvedPublicApiBaseUrl(),
  },
  /**
   * Server Actions default body limit is 1 MB. Category forms upload multipart images.
   * Set in both places so dev/prod pick it up across Next versions (see Next.js docs).
   */
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3003",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3003",
        pathname: "/**",
      },
      ...remotePatternsFromEnv(),
    ],
  },
  async redirects() {
    return [
      {
        source: "/details",
        has: [{ type: "query", key: "slug", value: "(?<slug>.*)" }],
        destination: "/details/:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/details/:slug",
        destination: "/details?slug=:slug",
      },
      {
        source: "/category=:slug",
        destination: "/?category=:slug",
      },
    ];
  },
};

export default nextConfig;
