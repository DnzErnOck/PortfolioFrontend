"use client";

import { useEffect, useState } from "react";
import { UserService } from "@/services/userService";
import styles from "./dashboardSidebar.module.css";
import image from '../../../../images/avatar2.jpg'; 
import Image from "next/image";
const menuItems = [
  { title: "Dashboard", icon: "📊", url: "/admin/dashboard" },
  { title: "Profile", icon: "👤", url: "/admin/user" },
  { title: "About Me", icon: "📝",url: "/admin/about" },
  { title: "Projects", icon: "📁", url: "/admin/projects" },
  { title: "Skills", icon: "🛠️", url: "/admin/skills" },
  { title: "Social Media", icon: "🌐", url: "/admin/socialMedia" },
  { title: "Experience", icon: "💼", url: "/admin/experience" },
  { title: "Certificate", icon: "📜", url: "/admin/certificates" },
  { title: "Education", icon: "🎓", url: "/admin/educations" },
  { title: "Language", icon: "🗣️", url: "/admin/languages" },
  { title: "Courses", icon: "📚", url: "/admin/courses" },
  { title: "Blog", icon: "✍️", url: "/admin/post" },
  { title: "Resume", icon: "📄", url: "/admin/resume" },
  { title: "Contact", icon: "📞", url: "/admin/contact" },
];

export default function DashboardSidebar() {
  const [user, setUser] = useState<any | null>(null); // Kullanıcı verisi için state

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await UserService.getUser(); // Servisten kullanıcıyı çek
      setUser(userData); // State'e kullanıcıyı ata
    };
    fetchUserData();
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
       
        <Image
            src={image} // Resmi next/image ile doğru şekilde gösteriyoruz
            alt="User Avatar"
            className={styles.avatar}
          />
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{user?.name +" "+user?.surname}</h2>
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
        <button className={styles.logoutButton} onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
