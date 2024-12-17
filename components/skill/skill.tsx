import { getSkills } from '@/services/skillService';
import React, { useEffect, useState } from 'react';
import styles from "./skill.module.css";

// SkillTip modelini oluşturuyoruz
interface Skill {
  id: number;
  imageBase64: string;
  name: string;
}

// Bir resmin ortalama rengini analiz eden yardımcı fonksiyon
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

  // Parlaklaştır
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
        const fetchedSkills = await getSkills();
        setSkills(fetchedSkills);
      } catch (err) {
        setError('Failed to fetch skills');
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
    <div className={styles.skillsContainer}>
      <div className={styles.skillsTitle}>My Skills</div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.skillsIcons}>
        {skills.map((skill) => (
          <div className={styles.skill} key={skill.id}>
            <div className={styles.icon}>
              <img src={skill.imageBase64} alt={skill.name} />
            </div>
            {/* <div className={styles.skillName}>{skill.name}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
