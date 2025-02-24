import ExperienceContainer from '@/containers/experiences';
import { ExperienceService } from '@/services/experienceService';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Deneyimleri alıyoruz
    const data = await ExperienceService.fetchExperiences(0, 10); // 10 deneyimi alıyoruz
    const latestExperience = data.content[data.content.length - 1]; // En son deneyimi alıyoruz

    return {
      description: `My latest work experience includes a role as ${latestExperience.position} at ${latestExperience.workplace}, focusing on ${latestExperience.departmentTitle}.`,
      keywords: `${latestExperience.position}, ${latestExperience.workplace}, ${latestExperience.departmentTitle}, work experience`,
    };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return {
      title: `Experiences - My Portfolio`,
      description: "Explore the experiences I have gained over the years.",
      keywords: "work experience, my portfolio",
    };
  }
}

const ExperiencesPage: React.FC = () => {
  return <ExperienceContainer />;
};

export default ExperiencesPage;