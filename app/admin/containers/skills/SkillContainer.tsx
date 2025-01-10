"use client";

import { useEffect, useState } from "react";
import { SkillService } from "@/services/skillService";
import SkillTable from "../../components/skills/SkillTable";
import SkillForm from "../../components/skills/SkillForm";

import styles from "../../../utils/adminTable/container.module.css";

interface Notification {
  type: "success" | "error";
  message: string;
}

const SkillContainer = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadSkills = async (page: number = 0) => {
    setLoading(true);
    try {
      const data = await SkillService.getAll(page, 10); // Sayfa başına 10 öğe
      setSkills(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Yetenekler yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Yetenekler yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSkill = async (skill: any): Promise<boolean> => {
    try {
      await SkillService.create(skill);
      loadSkills();
      setIsModalOpen(false);
      showNotification({ type: "success", message: "Yetenek başarıyla oluşturuldu." });
      return true;
    } catch (error: any) {
      console.error("Yetenek oluşturulurken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Yetenek oluşturulamadı." });
      return false;
    }
  };

  const handleUpdateSkill = async (skill: any): Promise<boolean> => {
    try {
      await SkillService.update(skill);
      loadSkills();
      setSelectedSkill(null);
      showNotification({ type: "success", message: "Yetenek başarıyla güncellendi." });
      return true;
    } catch (error: any) {
      console.error("Yetenek güncellenirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Yetenek güncellenemedi." });
      return false;
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      await SkillService.delete(id);
      const remainingSkills = skills.length - 1;
      const shouldLoadPreviousPage = remainingSkills === 0 && currentPage > 0;

      if (shouldLoadPreviousPage) {
        loadSkills(currentPage - 1);
      } else {
        loadSkills(currentPage);
      }

      showNotification({ type: "success", message: "Yetenek başarıyla silindi." });
    } catch (error: any) {
      console.error("Yetenek silinirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Yetenek silinemedi." });
    }
  };

  const handlePageChange = (page: number) => {
    loadSkills(page);
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Skill Management</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Skill
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

      <SkillTable
        skills={skills}
        onEdit={(skill) => setSelectedSkill(skill)}
        onDelete={(id) => handleDeleteSkill(id)}
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
        <SkillForm
          onSubmit={handleCreateSkill}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {selectedSkill && (
        <SkillForm
          initialData={selectedSkill}
          onSubmit={handleUpdateSkill}
          onCancel={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
};

export default SkillContainer;
