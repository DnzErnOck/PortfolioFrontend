"use client";

import { useEffect, useState } from "react";
import styles from "../../../utils/adminTable/form.module.css";

interface ExperienceFormProps {
  initialData?: any; // Eğer bir deneyim düzenlenecekse başlangıç verileri
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    departmentTitle: "",
    workplace: "",
    position: "",
    detail: "", // Yeni eklenen alan
    startDate: "",
    finishDate: null, // Varsayılan olarak null
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
            <label htmlFor="departmentTitle">Department Title</label>
            <input
              type="text"
              id="departmentTitle"
              name="departmentTitle"
              placeholder="Enter department title"
              value={formData.departmentTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="workplace">Workplace</label>
            <input
              type="text"
              id="workplace"
              name="workplace"
              placeholder="Enter workplace name"
              value={formData.workplace}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Enter position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail">Details</label>
            <textarea
              id="detail"
              name="detail"
              placeholder="Enter details about the experience"
              value={formData.detail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="finishDate">Finish Date</label>
            <input
              type="date"
              id="finishDate"
              name="finishDate"
              value={formData.finishDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, finishDate: e.target.value || null })
              }
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

export default ExperienceForm;
