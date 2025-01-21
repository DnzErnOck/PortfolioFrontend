"use client";

import { useEffect, useState } from "react";
import { UserService } from "@/services/userService";
import UserTable from "../../components/user/UserTable";
import UserForm from "../../components/user/UserForm";

import styles from "../../../utils/adminTable/container.module.css";

interface Notification {
  type: "success" | "error";
  message: string;
}

const UserContainer = () => {
  const [user, setUser] = useState<any | null>(null); // Tek bir kullanıcı
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadUser = async (userId: number = 1) => {
    setLoading(true);
    try {
      const data = await UserService.getUser(userId); // Kullanıcıyı getir
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setNotification({ type: "error", message: "Kullanıcı verisi alınamadı." });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedUser: any): Promise<boolean> => {
    try {
      const success = await UserService.updateUser(updatedUser);
      if (success) {
        loadUser(); // Güncellemeden sonra kullanıcıyı yeniden yükle
        setIsFormOpen(false);
        showNotification({ type: "success", message: "Kullanıcı başarıyla güncellendi." });
        return true;
      }
    } catch (error: any) {
      console.error("Error updating user data:", error);
      showNotification({ type: "error", message: "Kullanıcı güncellenemedi." });
    }
    return false;
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadUser(); // Bileşen yüklendiğinde kullanıcıyı getir
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <button className={styles.addButton} onClick={() => setIsFormOpen(true)}>
          Edit User
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

      {!loading && user && (
        <UserTable
          user={user} // Tek bir kullanıcı
          onEdit={() => setIsFormOpen(true)} // Formu aç
        />
      )}

      {loading && <p>Loading user data...</p>}

      {isFormOpen && user && (
        <UserForm
          initialData={user}
          onSubmit={handleUpdateUser}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default UserContainer;
