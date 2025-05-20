import { Inter } from "next/font/google";
import "@/styles/reset.css";
import "@/styles/global.css";
import ClientWrapper from "@/components/ClientWrapper";
import { UserService } from "@/services/userService";
import { Metadata } from "next";

const interFontFamily = Inter({ subsets: ["latin"] });

// Layout-level metadata generation
export async function generateMetadata(): Promise<Metadata> {

  const user = await UserService.getUser(); // Kullanıcıyı al
  const fullName = user ? `${user.name} ${user.surname}` : "My Portfolio";

  return {
    title: `${fullName} - My Portfolio`, // Başlık dinamik
    description: "Welcome to my portfolio website. Discover my projects, experiences, and skills.", // Sabit açıklama
    openGraph: {
      title: `${fullName} - My Portfolio`, // OG Başlık
      description: "Welcome to my portfolio website. Discover my projects, experiences, and skills.", // OG Açıklama
      url: "https://yourportfolio.com", // Ana site URL'si
      siteName: "My Portfolio",
      images: [
        {
          url: "https://yourportfolio.com/og-image.jpg", // OG görsel URL'si (Görsel ekle)
          width: 1200,
          height: 630,
          alt: "Portfolio Preview",
        },
      ],
    },
  };

}

// ✅ Artık asenkron işlemi destekliyor
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" className={interFontFamily.className}>
      <body className="container flex flex-col min-h-screen relative">
        <ClientWrapper>
          {/* <Header /> */}
          <main>{children}</main>
        </ClientWrapper>
      </body>
    </html>
  );
}
