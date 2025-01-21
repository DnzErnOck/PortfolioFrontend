"use client";

import React, { useState } from "react";
import styles from "../../../utils/adminTable/form.module.css";

interface ResumeFormProps {
  onSubmit: (file: File) => void;
  onCancel: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    await onSubmit(file);
    setLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="resume">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
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

export default ResumeForm;
