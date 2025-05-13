'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContactService, CreateContactRequest } from "../../services/contactService";
import Image from "next/image";
import gifImage from "../../public/images/contact2.gif"; // GIF'i içe aktarıyoruz
import styles from "./contactForm.module.css";

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

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ContactService.createContact(formData);
      setStatusMessage("Your message has been sent successfully!");
      setStatusType("success");
      setFormData({ name: "", surname: "", mailAddress: "", message: "" });
      setIsPopupVisible(true);

      setTimeout(() => {
        setIsPopupVisible(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Failed to send your message. Please try again.");
      setStatusType("error");
      setIsPopupVisible(true);

      setTimeout(() => setIsPopupVisible(false), 55000);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        {/* Sol tarafta GIF */}
        <div className={styles.gifContainer}>
          <Image src={gifImage} alt="Contact Animation" className={styles.gifImage} />
        </div>

        {/* Sağ tarafta Form */}
        <div className={styles.formContainer}>
          <h1 className={styles.pageTitle}>Get in Touch</h1>

          {isPopupVisible && (
            <div className={`${styles.popup} ${styles[statusType ?? ""]}`}>
              <span className={styles.icon}>
                {statusType === "success" ? "✅" : "❌"}
              </span>
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Surname:</label>
              <input
                type="text"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                placeholder="Your Surname"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                value={formData.mailAddress}
                onChange={(e) => setFormData({ ...formData, mailAddress: e.target.value })}
                placeholder="Your Email"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Message:</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your Message"
              />
            </div>
            <button className={styles.button} type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
