"use client";

import { useEffect, useState } from "react";
import styles from "../../../utils/adminTable/form.module.css";

interface CertificateFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    organisationName: "",
    givenDate: "",
    certificateSiteLink: "",
    serialNumber: "",
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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <label htmlFor="title">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Enter certificate name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="organisationName">Organisation Name</label>
            <textarea
              id="organisationName"
              name="organisationName"
              placeholder="Enter certificate organisation Name"
              value={formData.organisationName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="givenDate">Given Date</label>
            <input
              type="date"
              id="givenDate"
              name="givenDate"
              value={formData.givenDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="certificateSiteLink">Certificate Site Link</label>
            <input
              type="text"
              id="certificateSiteLink"
              name="certificateSiteLink"
              placeholder="Enter Certificate Site URL"
              value={formData.certificateSiteLink}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="serialNumber">Serial Number</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              placeholder="Enter Serial Number"
              value={formData.serialNumber}
              onChange={handleInputChange}
            />
          </div>


          <div className={styles.formGroupPicture}>
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} />
            {formData.imageBase64 && (
              <img src={formData.imageBase64} alt="Preview" className={styles.imagePreview} />
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

export default CertificateForm;
