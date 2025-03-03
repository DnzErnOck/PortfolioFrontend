"use client";

import { useEffect, useState } from "react";
import { ContactService } from "@/services/contactService";

import styles from "../../../utils/adminTable/container.module.css";
import ContactTable from "../../components/contact/ContactTable";
import ContactDetailsForm from "../../components/contact/ContactDetailsForm";

interface Notification {
  type: "success" | "error";
  message: string;
}

const ContactContainer = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await ContactService.getAllContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error loading contacts:", error);
      setNotification({ type: "error", message: "Error loading contacts." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await ContactService.deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
      showNotification({ type: "success", message: "Contact successfully deleted." });
    } catch (error) {
      console.error("Error deleting contact:", error);
      showNotification({ type: "error", message: "Error deleting contact." });
    }
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Contact Management</h1>
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

      <ContactTable
        contacts={contacts}
        onView={(contact) => setSelectedContact(contact)}
        onDelete={(id) => handleDeleteContact(id)}
      />

      {selectedContact && (
        <ContactDetailsForm
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
};

export default ContactContainer;
