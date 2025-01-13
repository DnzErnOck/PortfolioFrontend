"use client";

import { useEffect, useState } from "react";
import { EducationService } from "@/services/educationService";
import styles from "../../../utils/adminTable/container.module.css";
import EducationTable from "../../components/educations/EducationTable";
import EducationForm from "../../components/educations/EducationForm";

interface Notification {
  type: "success" | "error";
  message: string;
}

const EducationContainer = () => {
  const [educations, setEducations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEducation, setSelectedEducation] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadEducations = async () => {
    setLoading(true);
    try {
      const data = await EducationService.fetchEducations();
      setEducations(data);
    } catch (error) {
      console.error("Eğitimler yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Eğitimler yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEducation = async (education: any): Promise<boolean> => {
    try {
      await EducationService.createEducation(education);
      loadEducations();
      setIsModalOpen(false);
      showNotification({ type: "success", message: "Eğitim başarıyla oluşturuldu." });
      return true;
    } catch (error: any) {
      console.error("Eğitim oluşturulurken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Eğitim oluşturulamadı." });
      return false;
    }
  };

  const handleUpdateEducation = async (educationData: any): Promise<boolean> => {
    try {
      await EducationService.updateEducation(educationData);
      loadEducations();
      setSelectedEducation(null);
      showNotification({ type: "success", message: "Eğitim başarıyla güncellendi." });
      return true;
    } catch (error: any) {
      console.error("Eğitim güncellenirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Eğitim güncellenemedi." });
      return false;
    }
  };

  const handleDeleteEducation = async (id: number) => {
    try {
      await EducationService.deleteEducation(id);
      loadEducations();
      showNotification({ type: "success", message: "Eğitim başarıyla silindi." });
    } catch (error: any) {
      console.error("Eğitim silinirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Eğitim silinemedi." });
    }
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadEducations();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Education Management</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Education
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

      <EducationTable
        educations={educations}
        onEdit={(education) => setSelectedEducation(education)}
        onDelete={(id) => handleDeleteEducation(id)}
      />

      {isModalOpen && (
        <EducationForm
          onSubmit={handleCreateEducation}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

    {selectedEducation && (
    <EducationForm
        initialData={selectedEducation}
        onSubmit={handleUpdateEducation}
        onCancel={() => setSelectedEducation(null)}
    />
    )}
    </div>
  );
};

export default EducationContainer;
