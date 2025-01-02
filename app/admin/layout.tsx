import DashboardSidebar from "@/components/dashboardSidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Content */}
          <main style={{ flex: 1, padding: "20px", backgroundColor: "#f9fafb" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
