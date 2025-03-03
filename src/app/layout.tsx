import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AppWrapper } from "@/contexts";
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
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
        <Analytics />
      </body>
    </html>
  );
}
