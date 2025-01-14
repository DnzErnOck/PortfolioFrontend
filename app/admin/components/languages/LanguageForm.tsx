"use client";

import { useEffect, useState } from "react";
import styles from "../../../utils/adminTable/form.module.css";

interface LanguageFormProps {
  initialData?: any; // Eğer bir deneyim düzenlenecekse başlangıç verileri
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const levels = [
  { id: 1, name: "A1" },
  { id: 2, name: "A2" },
  { id: 3, name: "B1" },
  { id: 4, name: "B2" },
  { id: 5, name: "C1" },
  { id: 6, name: "C2" },
];

const LanguageForm: React.FC<LanguageFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    levelId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="levelId">Level</label>
            <select
              id="levelId"
              name="levelId"
              className={styles.select}
              value={formData.levelId} // Seçili olan değer burada belirleniyor
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Level
              </option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
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

export default LanguageForm;
