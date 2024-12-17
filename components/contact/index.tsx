'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContactService, CreateContactRequest } from "../../services/contactService";
import styles from "./contactForm.module.css";  // Import the CSS module

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateContactRequest>({
    name: "",
    surname: "",
    mailAddress: "",
    message: "",
  });
  
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  
  const router = useRouter();  // Hook to redirect to the home page

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ContactService.createContact(formData);
      setStatusMessage("Message sent successfully!");
      setStatusType("success");
      setFormData({ name: "", surname: "", mailAddress: "", message: "" });  // Clear form fields
      setIsPopupVisible(true);
      
      setTimeout(() => {
        setIsPopupVisible(false);  // Hide the popup after 3 seconds
        router.push("/");  // Redirect to the homepage after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Failed to send the message. Please try again.");
      setStatusType("error");
      setIsPopupVisible(true);
      
      setTimeout(() => {
        setIsPopupVisible(false);  // Hide the popup after 3 seconds
      }, 3000);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.pageTitle}>Contact Us</h1>
      
      {/* Show status message as popup */}
      {isPopupVisible && (
        <div className={`${styles.popup} ${styles[statusType ?? ""]} ${styles.popupVisible}`}>
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Surname:</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={formData.mailAddress}
            onChange={(e) => setFormData({ ...formData, mailAddress: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Message:</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={styles.textarea}
          />
        </div>
        <button className={styles.button} type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
