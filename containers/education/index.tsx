"use client"
import React, { useEffect, useState } from "react";
import { EducationService } from "../../services/educationService";
import styles from "./education.module.css";

interface Education {
  id: number;
  name: string;
  startDate: string;
  finishDate: string;
  major: string;
}

const EducationContainer: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    const getEducations = async () => {
      const data = await EducationService.fetchEducations();
      setEducations(data);
    };
    getEducations();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Education</h2>
      {educations.map((edu) => (
        <div key={edu.id} className={styles.educationItem}>
          <p  className={styles.educationDate}>
            {formatDate(edu.startDate)} - {formatDate(edu.finishDate)}
          </p>
          <h3>{edu.name}</h3>
          <p>{edu.major}</p>
          
        </div>
      ))}
    </div>
  );
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

export default EducationContainer;
