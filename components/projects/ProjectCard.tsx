import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./projects.module.css";

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
  Javascript: "#F7DF1E", // JavaScript için sarı
  HTML: "#E34F26", // HTML için kırmızı-turuncu
  CSS: "#1572B6", // CSS için mavi
  PostgreSql: "#336791", // PostgreSQL için koyu mavi
  Postman: "#872B0AFF", // Postman için turuncu
  Redux: "#764ABC", // Redux için mor
  Github: "#4A4747FF", // GitHub için koyu gri
  Eclipse: "#2C2255", // Eclipse için mor-lacivert
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
      {/* 🖼️ Üstteki Görsel Alanı */}
      <div className={styles.cardImageContainer}>
        <img
          src={imageBase64 ? `${imageBase64}` : "/default-placeholder.png"}
          alt={title}
          className={styles.cardImage}
          onError={(e) => (e.currentTarget.src = "/default-placeholder.png")}
        />
      </div>

      {/* 📌 Alttaki İçerik Alanı */}
      <div className={styles.cardContent}>
      <div className={styles.cardTitleAndSkills}>
        <h3 className={styles.cardTitle}>{title}</h3>

        {/* 🏷️ Teknoloji Etiketleri */}
        <div className={styles.skills}>
          {skillNames.map((skill, index) => (
            <span key={index} className={styles.skill} style={getSkillColor(skill)}>
              {skill}
            </span>
          ))}
          </div>
        </div>

        {/* 📄 Açıklama */}
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
