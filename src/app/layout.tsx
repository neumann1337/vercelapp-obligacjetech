import type { Metadata } from "next";
import "./globals.css";

import { NavBar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "OBLIGACJETECH",
  description: "Kalkulator zysków z obligacji skarbowych",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}