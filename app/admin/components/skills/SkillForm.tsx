"use client";

import { useEffect, useState } from "react";
import styles from "../../../utils/adminTable/form.module.css";
interface SkillFormProps {
  initialData?: any; // Eğer bir skill düzenlenecekse başlangıç verileri
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    image: null,
    imageBase64: null,
    isGetNewPicture: false, // Varsayılan olarak false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        imageBase64: initialData.imageBase64 || null, // Mevcut resmi önizleme için ekle
        isGetNewPicture: false, // Yeni resim seçilmediği için false
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Yeni dosya seçildiğinde
      setFormData({
        ...formData,
        image: file,
        isGetNewPicture: true, // Yeni resim seçildiği için true
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData: any) => ({
          ...prevFormData,
          imageBase64: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");

      // Yeni dosya seçilmediğinde mevcut resmi koru
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        image: null, // Yeni resim seçilmediği için image null olabilir
        isGetNewPicture: false, // Yeni resim seçilmediği için false
      }));
    }
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
            <label htmlFor="name">Skill Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter skill name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroupPicture}>
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} />
            {formData.imageBase64 && (
              <img src={formData.imageBase64} alt="Preview" className={styles.imagePreview} style={{width:"30%",height:"50%"}} />
            )}
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

export default SkillForm;
