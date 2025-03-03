"use client";

import { useEffect, useState } from "react";
import { ExperienceService } from "@/services/experienceService";
import styles from "../../../utils/adminTable/container.module.css";
import ExperienceTable from "../../components/experiences/ExperienceTable";
import ExperienceForm from "../../components/experiences/ExperienceForm";

interface Notification {
  type: "success" | "error";
  message: string;
}

const ExperienceContainer = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadExperiences = async (page: number = 0) => {
    setLoading(true);
    try {
      const data = await ExperienceService.fetchExperiences(page, 10); // Sayfa başına 10 öğe
      setExperiences(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Deneyimler yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Deneyimler yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExperience = async (experience: any): Promise<boolean> => {
    try {
      await ExperienceService.createExperience(experience);
      loadExperiences();
      setIsModalOpen(false);
      showNotification({ type: "success", message: "Deneyim başarıyla oluşturuldu." });
      return true;
    } catch (error: any) {
      console.error("Deneyim oluşturulurken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Deneyim oluşturulamadı." });
      return false;
    }
  };

  const handleUpdateExperience = async (experience: any): Promise<boolean> => {
    try {
      await ExperienceService.updateExperience(experience);
      loadExperiences();
      setSelectedExperience(null);
      showNotification({ type: "success", message: "Deneyim başarıyla güncellendi." });
      return true;
    } catch (error: any) {
      console.error("Deneyim güncellenirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Deneyim güncellenemedi." });
      return false;
    }
  };

  const handleDeleteExperience = async (id: number) => {
    try {
      await ExperienceService.deleteExperience(id);
      const remainingExperiences = experiences.length - 1;
      const shouldLoadPreviousPage = remainingExperiences === 0 && currentPage > 0;

      if (shouldLoadPreviousPage) {
        loadExperiences(currentPage - 1);
      } else {
        loadExperiences(currentPage);
      }

      showNotification({ type: "success", message: "Deneyim başarıyla silindi." });
    } catch (error: any) {
      console.error("Deneyim silinirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Deneyim silinemedi." });
    }
  };

  const handlePageChange = (page: number) => {
    loadExperiences(page);
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Experience Management</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Experience
        </button>
      </div>
      {loading && <p>Loading...</p>} {/* Buraya ekledik */}
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

      <ExperienceTable
        experiences={experiences}
        onEdit={(experience) => setSelectedExperience(experience)}
        onDelete={(id) => handleDeleteExperience(id)}
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
        <ExperienceForm
          onSubmit={handleCreateExperience}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {selectedExperience && (
        <ExperienceForm
          initialData={selectedExperience}
          onSubmit={handleUpdateExperience}
          onCancel={() => setSelectedExperience(null)}
        />
      )}
    </div>
  );
};

export default ExperienceContainer;
