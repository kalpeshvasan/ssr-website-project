import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/ui-kit/components/SiteHeader";
import { SiteFooter } from "@/ui-kit/components/SiteFooter";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "NovaFlow — Modern Website Starter", template: "%s | NovaFlow" },
  description: "Modern responsive Next.js website starter with a reusable UI kit.",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
