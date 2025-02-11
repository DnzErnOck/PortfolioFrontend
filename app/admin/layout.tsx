import DashboardSidebar from "./components/dashboardSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
    style={{
      display: "flex",
      width: "100%", // Sayfanın tam genişliğini kapla
      minHeight: "100vh", // Tam ekran yüksekliği
      overflow: "hidden", // Yan scroll'u önlemek için
    }}
    >
      {/* Sidebar */}
      <DashboardSidebar />
      {/* Content */}
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f9fafb" }}>
        {children}
      </main>
    </div>
  );
}
