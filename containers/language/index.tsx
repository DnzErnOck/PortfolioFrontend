"use client";
import React, { useEffect, useState } from "react";
import { LanguageService } from "../../services/languageService";
import styles from "./language.module.css";

interface Language {
  id: number;
  name: string;
  languageLevel: string; // A1, B2 gibi seviyeler
}

const languageLevelMap: { [key: string]: number } = {
  Beginner: 20,
  Elementary: 40,
  Intermediate: 60,
  UpperIntermediate: 80,
  Advanced: 100,
  Proficient: 120,
};

const LanguageContainer: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const getLanguages = async () => {
      const data = await LanguageService.fetchLanguages();  
      setLanguages(data);
    };
    getLanguages();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Languages</h2>
      <div className={styles.starContainer}>
        {languages.map((lang) => {
          const stars = Math.ceil((languageLevelMap[lang.languageLevel] || 0) / 20);
          console.log(`Language: ${lang.name}, Level: ${lang.languageLevel}, Stars: ${stars}`);
          return (
            <div key={lang.id} className={styles.languageItem}>
              <strong>{lang.name}</strong>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <span 
                    key={index} 
                    className={index < stars ? styles.filledStar : styles.emptyStar}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageContainer;
