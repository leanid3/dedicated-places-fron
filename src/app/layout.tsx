import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/lib/providers/QueryProvider";
// import { useAuthCheck } from "@/lib/hooks/useAuthCheck";

export const metadata: Metadata = {
  title: "Dedicated Places",
  description: "Find and explore dedicated places for your events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useAuthCheck()
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-gray-50 ">
        <Header />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
