"use client";

import styles from "./dashboardContent.module.css";
import { User2, Book, Code2, ImageIcon, BarChart3, Settings } from "lucide-react";

const cards = [
  { icon: User2, title: "Profile", color: "#3b82f6", description: "Update your personal information and contact details", link: "/profile" },
  { icon: Book, title: "Projects", color: "#8b5cf6", description: "Manage your portfolio projects and case studies", link: "/projects" },
  { icon: Code2, title: "Skills", color: "#10b981", description: "Update your technical skills and expertise", link: "/skills" },
  { icon: ImageIcon, title: "Gallery", color: "#f97316", description: "Manage your work samples and images", link: "/gallery" },
  { icon: BarChart3, title: "Analytics", color: "#ec4899", description: "View portfolio performance and visitor statistics", link: "/analytics" },
  { icon: Settings, title: "Settings", color: "#eab308", description: "Configure your portfolio preferences", link: "/settings" },
];

export default function DashboardContent() {
  return (
    <div className={styles.content}>
    {/* Header Section */}
    <div className={styles.header}>
      <h1>Welcome to Your Portfolio Dashboard</h1>
      <p>Manage and customize your professional presence</p>
    </div>

    {/* Cards Section */}
    <div className={styles.cards}>
      {cards.map(({ icon: Icon, title, color, description, link }) => (
        <a key={title} href={link} className={styles.cardLink}>
          <div className={styles.card}>
            <div className={styles.iconContainer} style={{ backgroundColor: `${color}10` }}>
              <Icon style={{ color, width: "1.5rem", height: "1.5rem" }} />
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>

      {/* Activity Section */}
      <div className={styles.activityGrid}>
        <div className={styles.activityCard}>
          <div className={styles.activityHeader}>
            <h3 className={styles.activityTitle}>Recent Activity</h3>
          </div>
          <div>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.activityItem}>
                <div className={styles.activityDot}></div>
                <p className={styles.activityText}>Updated project documentation</p>
                <span className={styles.activityTime}>2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.activityCard}>
          <div className={styles.activityHeader}>
            <h3 className={styles.activityTitle}>Quick Actions</h3>
          </div>
          <div className={styles.quickActions}>
            <button className={styles.actionButton}>New Project</button>
            <button className={styles.actionButton}>Update Skills</button>
            <button className={styles.actionButton}>Add Image</button>
            <button className={styles.actionButton}>View Stats</button>
          </div>
        </div>
      </div>
    </div>
  );
}
