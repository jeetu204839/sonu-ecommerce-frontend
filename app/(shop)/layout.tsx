import type { Metadata } from "next";
import Script from "next/script";
import { Open_Sans } from "next/font/google";

import Footer from "./component/Footer";
import Navigation from "./component/Navigation";
import ShopAuthShell from "./component/ShopAuthShell";
import ShopDeferredStyles from "./component/ShopDeferredStyles";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Irozen - Trusted Supplier of Iron, Steel, GP Sheets, Coils & Metal Products in India",
  description:
    "Irozen is a trusted supplier of premium iron, steel, GP sheets, GC sheets, coils, pig iron and metal products across India. Quality materials, competitive pricing and reliable delivery.",
  icons: {
    icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <head>
        <link rel="preconnect" href="https://use.fontawesome.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/brand-overrides.css" />
      </head>
      <body>
        <a href="#main-content" className="shop-skip-link">
          Skip to main content
        </a>
        <Navigation />
        <ShopAuthShell>
          <main id="main-content">{children}</main>
        </ShopAuthShell>
        <Footer />
        <ShopDeferredStyles />

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
