"use client";

import { useEffect, useState } from "react";
import styles from "../../../utils/adminTable/form.module.css";

interface CourseFormProps {
  initialData?: any; // Eğer bir kurs düzenlenecekse başlangıç verileri
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    instructor: "",
    detail: "",
    date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Course Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter course name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="instructor">Instructor</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              placeholder="Enter instructor name"
              value={formData.instructor}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail">Course Detail</label>
            <textarea
              id="detail"
              name="detail"
              placeholder="Enter course details"
              value={formData.detail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Course Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {initialData ? "Update" : "Submit"}
            </button>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
