import React from 'react';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: any[]; // Burada tipleri daha net tanımlayabilirsin
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;
