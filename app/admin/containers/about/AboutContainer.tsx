"use client";

import { useEffect, useState } from "react";
import AboutTable from "../../components/about/AboutTable";
import AboutForm from "../../components/about/AboutForm";
import styles from "../../../utils/adminTable/container.module.css";
import { AboutService } from "@/services/aboutService";

interface Notification {
  type: "success" | "error";
  message: string;
}

const AboutContainer = () => {
    const [aboutData, setAboutData] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAbout, setSelectedAbout] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadAboutData = async () => {
    setLoading(true);
    try {
      const data = await AboutService.getAll();
      setAboutData(data);
    } catch (error) {
      console.error("About bilgileri yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "About bilgileri yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAbout = async (about: any): Promise<boolean> => {
    try {
      await AboutService.createAbout(about);
      loadAboutData();
      setIsModalOpen(false);
      showNotification("success", "About başarıyla oluşturuldu.");
      return true;
    } catch (error: any) {
      console.error("About oluşturulurken hata oluştu:", error);
      showNotification("error", "About oluşturulamadı.");
      return false;
    }
  };

  const handleUpdateAbout = async (about: any): Promise<boolean> => {
    try {
      await AboutService.updateAbout(about);
      loadAboutData();
      setSelectedAbout(null);
      showNotification("success", "About başarıyla güncellendi.");
      return true;
    } catch (error: any) {
      console.error("About güncellenirken hata oluştu:", error);
      showNotification("error", "About güncellenemedi.");
      return false;
    }
  };

  const handleDeleteAbout = async (id: number) => {
    try {
      await AboutService.deleteAbout(id);
      setAboutData(null);
      showNotification("success", "About başarıyla silindi.");
    } catch (error: any) {
      console.error("About silinirken hata oluştu:", error);
      showNotification("error", "About silinemedi.");
    }
  };

  // **Eksik olan `showNotification` fonksiyonunu ekledim**
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadAboutData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>About Management</h1>
        {!aboutData && (
          <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
            + Add About
          </button>
        )}
      </div>

      {notification && (
        <div
          className={`${styles.notification} ${notification ? styles.visible : styles.hidden}`}
          style={{
            backgroundColor: notification.type === "success" ? "#4CAF50" : "#F44336",
          }}
        >
          {notification.message}
        </div>
      )}

      {aboutData ? (
        <AboutTable aboutEntries={aboutData} onEdit={setSelectedAbout} onDelete={handleDeleteAbout} />
      ) : (
        <p className={styles.noData}>No About section found. Please add one.</p>
      )}

      {isModalOpen && <AboutForm onSubmit={handleCreateAbout} onCancel={() => setIsModalOpen(false)} />}
      {selectedAbout && <AboutForm initialData={selectedAbout} onSubmit={handleUpdateAbout} onCancel={() => setSelectedAbout(null)} />}
    </div>
  );
};

export default AboutContainer;
