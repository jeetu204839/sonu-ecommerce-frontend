import type { Metadata } from "next";
import Script from "next/dist/client/script";


export const metadata: Metadata = {
  title: "Auth",
  description: "Admin authentication page",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'></meta>
        {/* bootstrap 3.0.2 */}
        <link href="/admin/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        {/* font Awesome */}
        <link href="/admin/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        {/* Theme style */}
        <link href="/admin/css/AdminLTE.css" rel="stylesheet" type="text/css" />
      </head>
      <body className="skin-blue" >
        {children}
      </body>
</html>
  );
}
