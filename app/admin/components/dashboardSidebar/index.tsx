"use client";

import styles from "./dashboardSidebar.module.css";

const menuItems = [
  { title: "Dashboard", icon: "📊", url: "/admin/dashboard" },
  { title: "Profile", icon: "👤", url: "/admin/profile" },
  { title: "Projects", icon: "📁", url: "/admin/projects" },
  { title: "Skills", icon: "🛠️", url: "/admin/skills" },
  { title: "Social Media", icon: "🌐", url: "/admin/socialMedia" },
  { title: "Gallery", icon: "🖼️", url: "/admin/gallery" },
  { title: "Achievements", icon: "🏆", url: "/admin/achievements" },
  { title: "Settings", icon: "⚙️", url: "/admin/settings" },
];

export default function DashboardSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <img
          src="https://via.placeholder.com/50"
          alt="User Avatar"
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>John Doe</h2>
          <p className={styles.userRole}>Full Stack Developer</p>
        </div>
      </div>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li key={item.title} className={styles.menuItem}>
            <a href={item.url} className={styles.menuLink}>
              <span className={styles.icon}>{item.icon}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <button className={styles.logoutButton}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
