"use client";
import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../services/projectService";
import ProjectList from "../../components/projects/ProjectList";
import styles from "./projects.module.css";

interface ProjectResponse {
  id: number;
  title: string;
  detail: string;
  projectDate: string;
  liveSiteLink: string;
  githubLink: string;
}

interface PagedResponse {
  content: ProjectResponse[];
  totalPages: number;
  number: number;
}

const ProjectContainer: React.FC = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getProjects = async () => {
      const data: PagedResponse = await fetchProjects(page - 1, size);
      setProjects(data.content);
      setTotalPages(data.totalPages);
    };
    getProjects();
  }, [page, size]);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>My Projects</h1>
      <ProjectList projects={projects} />

      {/* Modern Sayfalama */}
      <div className={styles.pagination}>
        <button
          className={`${styles.pageButton} ${page === 1 ? styles.disabled : ""}`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              page === index + 1 ? styles.active : ""
            }`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`${styles.pageButton} ${
            page === totalPages ? styles.disabled : ""
          }`}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectContainer;
