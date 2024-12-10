import { Inter } from "next/font/google";
import "@/styles/reset.css";
import "@/styles/global.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Google Font
const interFontFamily = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={interFontFamily.className}>
      <body className="container flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Ana içerik */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
