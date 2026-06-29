import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import BootstrapScript from "./component/BootstrapScript";
import DeferredShopStyles from "./component/DeferredShopStyles";
import Footer from "./component/Footer";
import Navigation from "./component/Navigation";
import ShopAuthShell from "./component/ShopAuthShell";
import ShopLayoutHeadHints from "./component/ShopLayoutHeadHints";

import "./shop-globals.css";
import "./shop-theme.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
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
    <html lang="en" className={`${inter.className} ${poppins.variable} ${inter.variable}`}>
      <head>
        <ShopLayoutHeadHints />
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
        <DeferredShopStyles />
        <BootstrapScript />
      </body>
    </html>
  );
}
