import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './projects.module.css';

interface ProjectCardProps {
  id: number;
  imageBase64: string;
  title: string;
  detail: string;
  liveSiteLink: string;
  githubLink: string;
  skillName: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageBase64,
  title,
  detail,
  liveSiteLink,
  githubLink,
  skillName,
}) => {
  return (
    <div className={styles.cardContainer}>
      {/* Sol taraftaki görsel */}
      <div className={styles.cardImageContainer}>
        <img src={imageBase64} alt={title} className={styles.cardImage} />
      </div>

      {/* Sağ tarafta içerik */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        
        {/* Etiketler */}
        <div className={styles.skills}>
          {skillName.map((skill, index) => (
            <span key={index} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>

        {/* Açıklama */}
        <p className={styles.cardDetail}>{detail}</p>
        
        {/* İkonlar */}
        <div className={styles.buttons}>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <FaGithub />
          </a>
          <a href={liveSiteLink} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
