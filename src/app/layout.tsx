import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Weather",
  description: " A minimalistic Weather APP, that displays the weather of your current location.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
