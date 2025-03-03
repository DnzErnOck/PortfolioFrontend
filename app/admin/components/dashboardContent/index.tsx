"use client";

import { useEffect, useState } from "react";
import ToDoList from "../toDoList/ToDoList";
import styles from "./dashboardContent.module.css";
import { User2, Book, Code2, ImageIcon, Globe, Briefcase } from "lucide-react";

const cards = [
  { 
    icon: User2, 
    title: "Profile", 
    color: "#3b82f6", 
    description: "Update and customize your personal information and contact details.", 
    link: "./user" 
  },
  { 
    icon: Book, 
    title: "Projects", 
    color: "#8b5cf6", 
    description: "Showcase and manage your portfolio projects and case studies.", 
    link: "./projects" 
  },
  { 
    icon: Code2, 
    title: "Skills", 
    color: "#10b981", 
    description: "Highlight and update your technical skills and expertise.", 
    link: "./skills" 
  },
  { 
    icon: ImageIcon, 
    title: "Resume", 
    color: "#f97316", 
    description: "Upload and manage your professional resume with ease.", 
    link: "./resume" 
  },
  { 
    icon: Globe, 
    title: "Social Media", 
    color: "#ec4899", 
    description: "Link and manage your social media profiles for better visibility.", 
    link: "./socialMedia" 
  },
  { 
    icon: Briefcase, 
    title: "Experience", 
    color: "#eab308", 
    description: "Add and organize your professional experiences and achievements.", 
    link: "./experience" 
  },
  
];

const quotes = [
  "Success is not the key to happiness. Happiness is the key to success.",
  "Stay positive, work hard, and make it happen.",
  "The best way to predict the future is to create it.",
  "Do something today that your future self will thank you for.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Great things never come from comfort zones.",
  "Dream it. Believe it. Build it.",
];
export default function DashboardContent() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(getRandomQuote(quotes)); // Sayfa yüklendiğinde bir söz seç
  }, []);

  const getRandomQuote = (quotes: string[]) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };
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
            <h3 className={styles.activityTitle}>To Do List</h3>
          </div>
          <ToDoList />
        </div>

         <div className={styles.activityCard}>
          <div className={styles.activityHeader}>
            <h3 className={styles.activityTitle}>Inspirational Quote</h3>
          </div>
          <div className={styles.inspiration}>
            <p>🌟 {quote} 🌟</p>
          </div>
        </div>
      </div>
    </div>
  );
}
