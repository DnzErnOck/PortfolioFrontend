import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./projects.module.css";
import Image from 'next/image';
interface ProjectCardProps {
  imageBase64?: string;
  title: string;
  detail: string;
  liveSiteLink: string;
  githubLink: string;
  skillNames: string[];
}

const skillColors: Record<string, string> = {
  Spring: "#5AA469",
  Java: "#F89820",
  Typescript: "#3178C6",
  React: "#61DAFB",
  "Next.js": "#000000",
  Intellij: "#A633D6",
  Javascript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#1572B6",
  PostgreSql: "#336791",
  Postman: "#872B0AFF",
  Redux: "#764ABC",
  Github: "#4A4747FF",
  Eclipse: "#2C2255",
};

const getSkillColor = (skill: string) => ({
  backgroundColor: skillColors[skill] || "#777",
  color: "#FFF",
});

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageBase64,
  title,
  detail,
  liveSiteLink,
  githubLink,
  skillNames,
}) => {
  return (
    <div className={styles.cardContainer}>
      {/* 🖼️ Sol Tarafta Görsel */}
      <div className={styles.cardImageContainer}>
        <Image
          src={imageBase64 ? `${imageBase64}` : "/default-placeholder.png"}
          alt={title}
          className={styles.cardImage}
          onError={(e) => (e.currentTarget.src = "/default-placeholder.png")}
          width={400} 
          height={200} 
          unoptimized 
        />
      </div>

      {/* 📌 Sağ Tarafta İçerik */}
      <div className={styles.cardContent}>
        <div className={styles.cardTitleAndSkills}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.skills}>
            {skillNames.map((skill, index) => (
              <span
                key={index}
                className={styles.skill}
                style={getSkillColor(skill)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <p className={styles.cardDetail}>{detail}</p>

        {/* 🔗 Bağlantılar */}
        <div className={styles.buttons}>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <FaGithub />
            <span className={styles.buttonText}>GitHub</span>
          </a>
          <a href={liveSiteLink} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
            <FaExternalLinkAlt />
            <span className={styles.buttonText}>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
