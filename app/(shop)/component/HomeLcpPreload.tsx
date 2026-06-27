type Props = Readonly<{
  href: string;
}>;

/** Early LCP image hint — hoisted to document head by Next.js. */
export default function HomeLcpPreload({ href }: Props) {
  if (!href.trim()) {
    return null;
  }

  return (
    <link
      rel="preload"
      as="image"
      href={href}
      // React 19 / Next — high priority for hero LCP
      fetchPriority="high"
    />
  );
}
