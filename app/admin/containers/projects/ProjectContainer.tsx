"use client";

import { useEffect, useState } from "react";
import { fetchProjects, createProject, updateProject, deleteProject } from "@/services/projectService";
import ProjectTable from "../../components/projects/ProjectTable";
import ProjectForm from "../../components/projects/ProjectForm";
import styles from "./ProjectContainer.module.css";

interface Notification {
  type: "success" | "error";
  message: string;
}

const ProjectContainer = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadProjects = async (page: number = 0) => {
    setLoading(true);
    try {
      const data = await fetchProjects(page, 2);
      setProjects(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Projeler yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Projeler yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (project: any): Promise<boolean> => {
    try {
      await createProject(project);
      loadProjects();
      setIsModalOpen(false);
      showNotification({ type: "success", message: "Proje başarıyla oluşturuldu." });
      return true;
    } catch (error: any) {
      console.error("Proje oluşturulurken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Proje oluşturulamadı." });
      return false;
    }
  };

  const handleUpdateProject = async (project: any): Promise<boolean> => {
    try {
      await updateProject(project);
      loadProjects();
      setSelectedProject(null);
      showNotification({ type: "success", message: "Proje başarıyla güncellendi." });
      return true;
    } catch (error: any) {
      console.error("Proje güncellenirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Proje güncellenemedi." });
      return false;
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      const remainingProjects = projects.length - 1;
      const shouldLoadPreviousPage = remainingProjects === 0 && currentPage > 0;

      if (shouldLoadPreviousPage) {
        loadProjects(currentPage - 1);
      } else {
        loadProjects(currentPage);
      }

      showNotification({ type: "success", message: "Proje başarıyla silindi." });
    } catch (error: any) {
      console.error("Proje silinirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Proje silinemedi." });
    }
  };

  const handlePageChange = (page: number) => {
    loadProjects(page);
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Project Management</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Project
        </button>
      </div>

      {notification && (
        <div
          className={`${styles.notification} ${!notification ? styles.hidden : ""}`}
          style={{
            "--notification-bg-color": notification.type === "success" ? "#4CAF50" : "#F44336",
          } as React.CSSProperties}
        >
          {notification.message}
        </div>
      )}

      <ProjectTable
        projects={projects}
        onEdit={(project) => setSelectedProject(project)}
        onDelete={(id) => handleDeleteProject(id)}
      />

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={`${styles.pageButton} ${currentPage === 0 ? styles.disabledButton : ""}`}
            onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ""}`}
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`${styles.pageButton} ${currentPage === totalPages - 1 ? styles.disabledButton : ""}`}
            onClick={() => currentPage < totalPages - 1 && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {selectedProject && (
        <ProjectForm
          initialData={selectedProject}
          onSubmit={handleUpdateProject}
          onCancel={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectContainer;
