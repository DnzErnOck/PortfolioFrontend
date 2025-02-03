"use client";
import React, { useEffect, useState } from "react";
import { AboutService } from "@/services/aboutService";
import styles from "./about.module.css";
import { motion } from "framer-motion";

// 📌 Başlığa göre ikon atama fonksiyonu
const getIconForTitle = (title: string) => {
  const icons: Record<string, string> = {
    "Technical Skills": "💻",
    "Passion & Values": "🚀",
    "Career Goals": "🎯",
    "Collaboration & Growth": "🤝",
  };


  return icons[title] || "📝"; // Eğer tanımlı değilse varsayılan olarak kalem emoji
};

const About = () => {
  const [aboutData, setAboutData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null); // 📌 Hata mesajı için state

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await AboutService.getAll();
        if (!response || response.length === 0) {
          throw new Error("No about section found.");
        }
        setAboutData(response[0]); // 📌 İlk elemanı al
      } catch (err) {
        setError("Error fetching about data. Please try again later.");
        console.error("Error fetching about data:", err);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <motion.section
      className={styles.aboutSection}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className={styles.container}>
        {/* Başlık */}
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        <span> About Me </span>
        </motion.h2>

        {/* Hata Mesajı */}
        {error ? (
          <p className={styles.errorText}>{error}</p>
        ) : aboutData ? (
          <>
            {/* Genel Hakkımda Metni */}
            <p className={styles.aboutText}>{aboutData.aboutText || "No About Text Available"}</p>

            {/* Kartlar */}
            <div className={styles.cardContainer}>
              {aboutData.cards && aboutData.cards.length > 0 ? (
                aboutData.cards.map((card: any, index: number) => (
                  <motion.div
                    key={index}
                    className={styles.card}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className={styles.icon}>{getIconForTitle(card.title)}</div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </motion.div>
                ))
              ) : (
                <p>No cards available.</p>
              )}
            </div>
          </>
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </motion.section>
  );
};

export default About;
