"use client";
import "@/styles/reset.css";
import "@/styles/global.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-container">
      {/* Admin içerikleri */}
      {children}
    </div>
  );
}
