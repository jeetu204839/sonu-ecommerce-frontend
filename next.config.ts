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
  async rewrites() {
    return [
      {
        source: "/category=:slug",
        destination: "/?category=:slug",
      },
    ];
  },
};

export default nextConfig;
