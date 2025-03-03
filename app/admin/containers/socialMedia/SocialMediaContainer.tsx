"use client";

import { useEffect, useState } from "react";
import { SocialMediaService } from "@/services/socialMediaService";
import SocialMediaTable from "../../components/socialMedia/SocialMediaTable";
import SocialMediaForm from "../../components/socialMedia/SocialMediaForm";

import styles from "../../../utils/adminTable/container.module.css";

interface Notification {
  type: "success" | "error";
  message: string;
}

const SocialMediaContainer = () => {
  const [socialMedias, setSocialMedias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadSocialMedias = async (page: number = 0) => {
    setLoading(true);
    try {
      const data = await SocialMediaService.getAll(page, 10); // Sayfa başına 10 öğe
      setSocialMedias(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Sosyal medya platformları yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Sosyal medya platformları yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSocialMedia = async (socialMedia: any): Promise<boolean> => {
    try {
      await SocialMediaService.create(socialMedia);
      loadSocialMedias();
      setIsModalOpen(false);
      showNotification({ type: "success", message: "Sosyal medya platformu başarıyla oluşturuldu." });
      return true;
    } catch (error: any) {
      console.error("Sosyal medya platformu oluşturulurken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Sosyal medya platformu oluşturulamadı." });
      return false;
    }
  };

  const handleUpdateSocialMedia = async (socialMedia: any): Promise<boolean> => {
    try {
      await SocialMediaService.update(socialMedia);
      loadSocialMedias();
      setSelectedSocialMedia(null);
      showNotification({ type: "success", message: "Sosyal medya platformu başarıyla güncellendi." });
      return true;
    } catch (error: any) {
      console.error("Sosyal medya platformu güncellenirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Sosyal medya platformu güncellenemedi." });
      return false;
    }
  };

  const handleDeleteSocialMedia = async (id: number) => {
    try {
      await SocialMediaService.delete(id);
      const remainingSocialMedias = socialMedias.length - 1;
      const shouldLoadPreviousPage = remainingSocialMedias === 0 && currentPage > 0;

      if (shouldLoadPreviousPage) {
        loadSocialMedias(currentPage - 1);
      } else {
        loadSocialMedias(currentPage);
      }

      showNotification({ type: "success", message: "Sosyal medya platformu başarıyla silindi." });
    } catch (error: any) {
      console.error("Sosyal medya platformu silinirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Sosyal medya platformu silinemedi." });
    }
  };

  const handlePageChange = (page: number) => {
    loadSocialMedias(page);
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadSocialMedias();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Social Media Management</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Platform
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

      <SocialMediaTable
        socialMedias={socialMedias}
        onEdit={(socialMedia) => setSelectedSocialMedia(socialMedia)}
        onDelete={(id) => handleDeleteSocialMedia(id)}
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
        <SocialMediaForm
          onSubmit={handleCreateSocialMedia}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {selectedSocialMedia && (
        <SocialMediaForm
          initialData={selectedSocialMedia}
          onSubmit={handleUpdateSocialMedia}
          onCancel={() => setSelectedSocialMedia(null)}
        />
      )}
    </div>
  );
};

export default SocialMediaContainer;
