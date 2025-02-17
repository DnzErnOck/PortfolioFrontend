import React from 'react';
import ProjectCard from './ProjectCard';
import styles from "./projects.module.css";

interface ProjectListProps {
  projects: any[]; // Burada tipleri daha net tanımlayabilirsin
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div  className={styles.projectsGrid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
