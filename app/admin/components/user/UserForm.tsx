"use client";

import React, { useState } from "react";
import styles from "../../../utils/adminTable/form.module.css";

interface UserFormProps {
  initialData: any;
  onSubmit: (user: any) => Promise<boolean>;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [user, setUser] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await onSubmit(user);
    if (success) {
      onCancel(); // Başarılıysa formu kapat
    }
    setLoading(false);
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
              value={user.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={user.surname}
              onChange={handleChange}
              placeholder="Enter surname"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={user.emailAddress}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="aboutMe">About Me</label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={user.aboutMe}
              onChange={handleChange}
              placeholder="Enter details about the user"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail">Details</label>
            <textarea
              id="detail"
              name="detail"
              value={user.detail}
              onChange={handleChange}
              placeholder="Enter user details"
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? "Updating..." : "Save"}
            </button>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
