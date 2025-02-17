"use client";

import { useEffect, useState } from "react";
import { SkillService } from "@/services/skillService";
import SkillTable from "../../components/skills/SkillTable";
import SkillForm from "../../components/skills/SkillForm";

import styles from "../../../utils/adminTable/container.module.css";
import { CertificateService } from "@/services/certificateService";
import CertificateTable from "../../components/certificates/CertificateTable";
import CertificateForm from "../../components/certificates/CertificateForm";

interface Notification {
  type: "success" | "error";
  message: string;
}

const CertificateContainer = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadCertificates = async (page: number = 0) => {
    setLoading(true);
    try {
      const data = await CertificateService.getAll(page, 10); // Sayfa başına 10 öğe
      setCertificates(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Sertifikalar yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Sertifikalar yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCertificate = async (certificate: any): Promise<boolean> => {
    try {
      await CertificateService.create(certificate);
      loadCertificates();
      setIsModalOpen(false);
      showNotification({ type: "success", message: "Sertifika başarıyla oluşturuldu." });
      return true;
    } catch (error: any) {
      console.error("Sertifika oluşturulurken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Sertifika oluşturulamadı." });
      return false;
    }
  };

  const handleUpdateCertificate = async (certificate: any): Promise<boolean> => {
    try {
      console.log(certificate);
      
      await CertificateService.update(certificate);
      loadCertificates();
      setSelectedCertificate(null);
      showNotification({ type: "success", message: "Sertifika başarıyla güncellendi." });
      return true;
    } catch (error: any) {
      console.error("Sertifika güncellenirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Sertifika güncellenemedi." });
      return false;
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    try {
      await CertificateService.delete(id);
      const remainingCertificates = certificates.length - 1;
      const shouldLoadPreviousPage = remainingCertificates === 0 && currentPage > 0;

      if (shouldLoadPreviousPage) {
        loadCertificates(currentPage - 1);
      } else {
        loadCertificates(currentPage);
      }

      showNotification({ type: "success", message: "Sertifika başarıyla silindi." });
    } catch (error: any) {
      console.error("Sertifika silinirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Sertifika silinemedi." });
    }
  };

  const handlePageChange = (page: number) => {
    loadCertificates(page);
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Certificate Management</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Certificate
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

      <CertificateTable
        certificates={certificates}
        onEdit={(certificate) => setSelectedCertificate(certificate)}
        onDelete={(id) => handleDeleteCertificate(id)}
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
        <CertificateForm
          onSubmit={handleCreateCertificate}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {selectedCertificate && (
        <CertificateForm
          initialData={selectedCertificate}
          onSubmit={handleUpdateCertificate}
          onCancel={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
};

export default CertificateContainer;
