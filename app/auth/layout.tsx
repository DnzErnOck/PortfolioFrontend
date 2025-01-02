"use client";
import "@/styles/reset.css";
import "@/styles/global.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="admin-container">
        {/* Admin içerikleri */}
        {children}
      </body>
    </html>
  );
}
