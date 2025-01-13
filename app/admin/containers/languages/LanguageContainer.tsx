"use client";

import { useEffect, useState } from "react";
import styles from "../../../utils/adminTable/container.module.css";
import { LanguageService } from "@/services/languageService";
import LanguageTable from "../../components/languages/LanguageTable";
import LanguageForm from "../../components/languages/LanguageForm";

interface Notification {
  type: "success" | "error";
  message: string;
}

const LanguageContainer = () => {
  const [languages, setLanguages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadLanguages = async () => {
    setLoading(true);
    try {
      const data = await LanguageService.fetchLanguages();
      setLanguages(data);
    } catch (error) {
      console.error("Yabancı diller yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Yabancı diller yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLanguage = async (language: any): Promise<boolean> => {
    try {
      await LanguageService.createLanguage(language);
      loadLanguages();
      setIsModalOpen(false);
      showNotification({ type: "success", message: "Yabancı dil başarıyla oluşturuldu." });
      return true;
    } catch (error: any) {
      console.error("Yabancı dil oluşturulurken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Yabancı dil oluşturulamadı." });
      return false;
    }
  };

  const handleUpdateLanguage = async (languageData: any): Promise<boolean> => {
    try {
      await LanguageService.updateLanguage(languageData);
      loadLanguages();
      setSelectedLanguage(null);
      showNotification({ type: "success", message: "Yabancı dil başarıyla güncellendi." });
      return true;
    } catch (error: any) {
      console.error("Yabancı dil güncellenirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Yabancı dil güncellenemedi." });
      return false;
    }
  };

  const handleDeleteLanguage = async (id: number) => {
    try {
      await LanguageService.deleteLanguage(id);
      loadLanguages();
      showNotification({ type: "success", message: "Yabancı dil başarıyla silindi." });
    } catch (error: any) {
      console.error("Yabancı dil silinirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Yabancı dil silinemedi." });
    }
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Language Management</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Language
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

      <LanguageTable
        languages={languages}
        onEdit={(language) => setSelectedLanguage(language)}
        onDelete={(id) => handleDeleteLanguage(id)}
      />

      {isModalOpen && (
        <LanguageForm
          onSubmit={handleCreateLanguage}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

    {selectedLanguage && (
    <LanguageForm
        initialData={selectedLanguage}
        onSubmit={handleUpdateLanguage}
        onCancel={() => setSelectedLanguage(null)}
    />
    )}
    </div>
  );
};

export default LanguageContainer;
