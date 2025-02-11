"use client";
import { Inter } from "next/font/google";
import "@/styles/reset.css";
import "@/styles/global.css"; // Global CSS içerisinde blob tanımları olacak
import Header from "@/components/header";
import { usePathname } from "next/navigation";

const interFontFamily = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Eğer admin veya auth rotasındaysak blob efektleri ekleme
  const isSpecialRoute = pathname.startsWith("/auth") || pathname.startsWith("/admin");

  return (
    <html lang="en" className={interFontFamily.className}>
      <body className="container flex flex-col min-h-screen relative overflow-hidden">
        {/* Eğer özel rota değilse blob efektlerini ekle */}
        {!isSpecialRoute && (
          <>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </>
        )}
        {/* Header sadece özel olmayan rotalarda */}
        {!isSpecialRoute && <Header />}
        <main>{children}</main>
      </body>
    </html>
  );
}