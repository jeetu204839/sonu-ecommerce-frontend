import type { NextConfig } from "next";

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
