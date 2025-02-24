import ProjectContainer from '@/containers/projects';
import { fetchProjects } from '@/services/projectService';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Projeleri alıyoruz
    const response = await fetchProjects(0, 10); // 10 projeyi alıyoruz örnek olarak
    const data = response.content || [];
    const projectTitles = data.map((project:any) => project.title).join(", "); // Proje başlıklarını virgülle ayırıyoruz

    return {
      description: `Explore my recent projects: ${projectTitles}.`, // Açıklama kısmına proje başlıklarını ekliyoruz
      keywords: projectTitles, // Proje başlıklarını anahtar kelime olarak ekliyoruz
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      title: `Projects - My Portfolio`,
      description: "Explore the projects I have worked on.",
      keywords: "projects, my portfolio", // Genel anahtar kelimeler
    };
  }
}

const ProjectsPage: React.FC = () => {
  return <ProjectContainer />;
};

export default ProjectsPage;
