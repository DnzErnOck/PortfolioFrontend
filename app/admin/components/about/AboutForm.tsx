"use client";

import { useEffect, useState } from "react";
import styles from "../../../utils/adminTable/form.module.css";
import aboutStyle from "./about.module.css";
import { Trash2, PlusCircle } from "lucide-react"; // Import icons

interface AboutFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AboutForm: React.FC<AboutFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    id: null,
    aboutText: "",
    cards: [{ title: "", description: "" }],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || null,
        aboutText: initialData.aboutText || "",
        cards: initialData.cards?.length ? initialData.cards : [{ title: "", description: "" }],
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log("Updated aboutText:", value);
  };

  const handleCardChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedCards = [...formData.cards];
    updatedCards[index] = { ...updatedCards[index], [name]: value };
    setFormData({ ...formData, cards: updatedCards });
    // console.log("Updated Cards:", updatedCards);
  };

  const addNewCard = () => {
    setFormData({ ...formData, cards: [...formData.cards, { title: "", description: "" }] });
  };

  const removeCard = (index: number) => {
    const updatedCards = formData.cards.filter((_: { title: string; description: string }, i: number) => i !== index);
    setFormData({ ...formData, cards: updatedCards.length ? updatedCards : [{ title: "", description: "" }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Gönderilen veri:", formData); // Burada console'a yazdır
    onSubmit(formData);
  };
  

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={aboutStyle.formTitle}>Edit About Section</h2>

          <div className={styles.formGroup}>
            <label htmlFor="aboutText">About Text</label>
            <textarea
              id="aboutText"
              name="aboutText"
              placeholder="Enter about description"
              value={formData.aboutText}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Dynamic Cards Section */}
          <div className={aboutStyle.cardContainer}>
            <h3 className={aboutStyle.sectionTitle}>Cards</h3>
            {formData.cards?.map((card: any, index: number) => (
              <div key={index} className={aboutStyle.cardItem}>
                <div className={aboutStyle.cardHeader}>
                  <h4> </h4>
                  <button type="button" className={aboutStyle.removeButton} onClick={() => removeCard(index)}>
                    <Trash2 size={20} /> {/* Trash Icon */}
                  </button>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`title-${index}`}>Card Title</label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    name="title"
                    placeholder="Enter card title"
                    value={card.title}
                    onChange={(e) => handleCardChange(index, e)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={`description-${index}`}>Card Description</label>
                  <textarea
                    id={`description-${index}`}
                    name="description"
                    placeholder="Enter card description"
                    value={card.description}
                    onChange={(e) => handleCardChange(index, e)}
                    required
                  />
                </div>
              </div>
            ))}

            <button type="button" className={aboutStyle.addButton} onClick={addNewCard}>
              <PlusCircle size={18} /> Add New Card
            </button>
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

export default AboutForm;
