"use client";

import { useState, useEffect } from "react";
import { ResumeService } from "@/services/resumeService";

import styles from "../../../utils/adminTable/container.module.css";
import ResumeTable from "../../components/resume/ResumeTable";
import ResumeForm from "../../components/resume/ResumeForm";

interface Notification {
  type: "success" | "error";
  message: string;
}

const ResumeContainer = () => {
  const [resumeExists, setResumeExists] = useState<boolean>(false);
  const [resumeName, setResumeName] = useState<string>(""); // Dosya adı için state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  

  // Özgeçmişin var olup olmadığını kontrol eden ve adını alan işlev
  const checkResumeStatus = async () => {
    try {
      const { exists, name } = await ResumeService.getResumeInfo();
      setResumeExists(exists);
      setResumeName(name);
    } catch (error) {
      console.error("Error checking resume existence:", error);
      setResumeExists(false);
      setResumeName("");
    }
  };

  const handleUploadResume = async (file: File) => {
    try {
      await ResumeService.uploadResume(file);
      setIsFormOpen(false);
      showNotification({ type: "success", message: "Resume uploaded successfully." });
      checkResumeStatus();
    } catch (error) {
      showNotification({ type: "error", message: "Failed to upload resume." });
    }
  };

  const handleDownloadResume = async () => {
    try {
      await ResumeService.downloadResume();
      showNotification({ type: "success", message: "Resume downloaded successfully." });
    } catch (error) {
      showNotification({ type: "error", message: "Failed to download resume." });
    }
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    checkResumeStatus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Resume Management</h1>
        <button className={styles.addButton} onClick={() => setIsFormOpen(true)}>
          {resumeExists ? "Update Resume" : "Upload Resume"}
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

      <ResumeTable
        resumeExists={resumeExists}
        resumeName={resumeName} // Dosya adını gönderiyoruz
        onDownload={handleDownloadResume}
        onEdit={() => setIsFormOpen(true)}
      />

      {isFormOpen && (
        <ResumeForm
          onSubmit={handleUploadResume}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default ResumeContainer;
