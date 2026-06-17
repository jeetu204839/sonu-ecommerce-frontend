import type { Metadata } from "next";
import Script from "next/script";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Irozen - Trusted Supplier of Iron, Steel, GP Sheets, Coils & Metal Products in India",
  description: "Irozen is a trusted supplier of premium iron, steel, GP sheets, GC sheets, coils, pig iron and metal products across India. Quality materials, competitive pricing and reliable delivery.",

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: ["/favicon.ico"],
  },
};


import Navigation from "./component/Navigation";
import Footer from "./component/Footer";
import ShopAuthShell from "./component/ShopAuthShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        
          {/* Google Web Fonts  */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap" rel="stylesheet" /> 

         {/* Icon Font Stylesheet  */}
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />

        {/* Libraries Stylesheet */}
        <link href="/lib/lightbox/css/lightbox.min.css" rel="stylesheet" />
        <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/brand-overrides.css" />

      </head>
      <body>
        <Navigation />
        <ShopAuthShell> <main>{children}</main> </ShopAuthShell>
        <Footer />

        {/* Load JS with next/script — raw <script> in RSC triggers a runtime error */}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script src="/lib/easing/easing.min.js" strategy="afterInteractive" />
        <Script src="/lib/waypoints/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/lib/lightbox/js/lightbox.min.js" strategy="afterInteractive" />
        <Script
          src="/lib/owlcarousel/owl.carousel.min.js"
          strategy="afterInteractive"
        />
      </body> 
    </html>
  );
}
