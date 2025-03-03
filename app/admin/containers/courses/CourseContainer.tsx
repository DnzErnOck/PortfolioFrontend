"use client";

import { useEffect, useState } from "react";
import { CourseService } from "@/services/courseService";
import CourseTable from "../../components/courses/CourseTable";
import CourseForm from "../../components/courses/CourseForm";

import styles from "../../../utils/adminTable/container.module.css";

interface Notification {
  type: "success" | "error";
  message: string;
}

const CourseContainer = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadCourses = async (page: number = 0) => {
    setLoading(true);
    try {
      const data = await CourseService.getAll(page, 10); // Sayfa başına 10 öğe
      setCourses(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Kurslar yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Kurslar yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (course: any): Promise<boolean> => {
    try {
      await CourseService.create(course);
      loadCourses();
      setIsModalOpen(false);
      showNotification({ type: "success", message: "Kurs başarıyla oluşturuldu." });
      return true;
    } catch (error: any) {
      console.error("Kurs oluşturulurken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Kurs oluşturulamadı." });
      return false;
    }
  };

  const handleUpdateCourse = async (course: any): Promise<boolean> => {
    try {
      await CourseService.update(course);
      loadCourses();
      setSelectedCourse(null);
      showNotification({ type: "success", message: "Kurs başarıyla güncellendi." });
      return true;
    } catch (error: any) {
      console.error("Kurs güncellenirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Kurs güncellenemedi." });
      return false;
    }
  };

  const handleDeleteCourse = async (id: number) => {
    try {
      await CourseService.delete(id);
      const remainingCourses = courses.length - 1;
      const shouldLoadPreviousPage = remainingCourses === 0 && currentPage > 0;

      if (shouldLoadPreviousPage) {
        loadCourses(currentPage - 1);
      } else {
        loadCourses(currentPage);
      }

      showNotification({ type: "success", message: "Kurs başarıyla silindi." });
    } catch (error: any) {
      console.error("Kurs silinirken hata oluştu:", error);
      showNotification({ type: "error", message: error.response?.data?.details?.[0] || "Kurs silinemedi." });
    }
  };

  const handlePageChange = (page: number) => {
    loadCourses(page);
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Course Management</h1>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          + Add New Course
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

      <CourseTable
        courses={courses}
        onEdit={(course) => setSelectedCourse(course)}
        onDelete={(id) => handleDeleteCourse(id)}
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
        <CourseForm
          onSubmit={handleCreateCourse}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {selectedCourse && (
        <CourseForm
          initialData={selectedCourse}
          onSubmit={handleUpdateCourse}
          onCancel={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default CourseContainer;
