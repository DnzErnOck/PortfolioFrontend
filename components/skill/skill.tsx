"use client";
import { SkillService } from '@/services/skillService';
import React, { useEffect, useState } from 'react';
import styles from "./skill.module.css";
import { motion } from "framer-motion";

interface Skill {
  id: number;
  imageBase64: string;
  name: string;
}

const getAverageColor = (image: HTMLImageElement): string => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return 'rgb(0, 0, 0)';

  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0, image.width, image.height);

  const imageData = context.getImageData(0, 0, image.width, image.height).data;
  let r = 0, g = 0, b = 0;
  const pixelCount = image.width * image.height;

  for (let i = 0; i < imageData.length; i += 4) {
    r += imageData[i];
    g += imageData[i + 1];
    b += imageData[i + 2];
  }

  r = Math.floor(r / pixelCount);
  g = Math.floor(g / pixelCount);
  b = Math.floor(b / pixelCount);

  const brightnessFactor = 1.4;
  r = Math.min(255, Math.floor(r * brightnessFactor));
  g = Math.min(255, Math.floor(g * brightnessFactor));
  b = Math.min(255, Math.floor(b * brightnessFactor));

  return `rgb(${r}, ${g}, ${b})`;
};

const Skill: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const pagedResponse = await SkillService.getAll();
        const fetchedSkills = pagedResponse.content.map((item) => ({
          id: item.id,
          imageBase64: item.imageBase64 || "",
          name: item.name,
        }));
        setSkills(fetchedSkills);
      } catch (err) {
        setError("Failed to fetch skills");
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const skillCards = document.querySelectorAll(`.${styles.skill}`);
    
    skillCards.forEach(skillCard => {
      const img = skillCard.querySelector('img');
      if (img && img.complete) {
        const avgColor = getAverageColor(img);
        skillCard.setAttribute('style', `box-shadow: 0 4px 8px ${avgColor}`);
      }
    });
  }, [skills]);

  return (
    <motion.div 
      className={styles.skillsContainer}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div 
        className={styles.skillsTitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span>My Skill-Set</span>
      </motion.div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.skillsIcons}>
        {skills.map((skill, index) => (
          <motion.div 
            className={styles.skill} 
            key={skill.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
          >
            <div className={styles.icon}>
              <img src={skill.imageBase64} alt={skill.name} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skill;