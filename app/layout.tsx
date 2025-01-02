"use client";
import { Inter } from "next/font/google";
import "@/styles/reset.css";
import "@/styles/global.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

const interFontFamily = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Eğer admin rotasındaysak bu layout'u render etme
  if (pathname.startsWith("/auth") || pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <html lang="en" className={interFontFamily.className}>
      <body className="container flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
