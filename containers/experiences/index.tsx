"use client";
import React, { useEffect, useState } from "react";
import { ExperienceService } from "../../services/experienceService";
import styles from "./experience.module.css";

interface Experience {
  id: number;
  departmentTitle: string;
  workplace: string;
  detail: string;
  position: string;
  startDate: string;
  finishDate: string | null; // Allow null for finishDate
}

interface PagedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

const ExperienceContainer: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const getExperiences = async () => {
      try {
        const response: PagedResponse<Experience> = await ExperienceService.fetchExperiences();
        
        // Sort experiences with most recent (or ongoing) first
        const sortedData = response.content.sort((a, b) => {
          const finishA = a.finishDate ? new Date(a.finishDate).getTime() : Infinity;
          const finishB = b.finishDate ? new Date(b.finishDate).getTime() : Infinity;

          if (finishA === finishB) {
            const startA = new Date(a.startDate).getTime();
            const startB = new Date(b.startDate).getTime();
            return startB - startA; // Secondary sort by startDate (most recent first)
          }

          return finishB - finishA; // Sort by finishDate (most recent first)
        });

        setExperiences(sortedData);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    getExperiences();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>My Experience</h1>
      <div className={styles.timeline}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.timelineItem}>
            <div className={styles.timelineIcon}>💼</div>
            <div className={styles.timelineContent}>
              <h3 className={styles.position}>{exp.position}</h3>
              <h4 className={styles.department}>
                {exp.departmentTitle} - {exp.workplace}
              </h4>
              <p className={styles.detail}>{exp.detail}</p>
              <p className={styles.date}>
                {formatDate(exp.startDate)} - {formatDate(exp.finishDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatDate = (date: string | null) => {
  if (!date) {
    return "Ongoing"; // Return "Ongoing" if finishDate is empty
  }
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

export default ExperienceContainer;
