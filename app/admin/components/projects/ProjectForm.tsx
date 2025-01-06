"use client";

import { useEffect, useState } from "react";
import styles from "./ProjectForm.module.css";
import { SkillService } from "@/services/skillService";

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    detail: "",
    projectDate: "",
    liveSiteLink: "",
    githubLink: "",
    skillIds: [],
    image: null,
    imageBase64: null,
    isGetNewPicture: false, // Varsayılan olarak false
  });

  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        skillIds: initialData.skillIds || [], // Skill ID'leri ayarla
        imageBase64: initialData.imageBase64 || null, // Mevcut resmi önizleme için ekle
        isGetNewPicture: false, // Yeni resim seçilmediği için false
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchSkills = async () => {
      const skillList = await SkillService.getSkills();
      setSkills(skillList);

      if (initialData && initialData.skillIds) {
        const selectedSkillIds = initialData.skillIds;
        setFormData((prev: typeof formData) => ({
          ...prev,
          skillIds: selectedSkillIds,
        }));
      }
    };

    fetchSkills();
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

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => Number(option.value));
    setFormData({ ...formData, skillIds: selectedIds });
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="detail">Detail</label>
            <textarea
              id="detail"
              name="detail"
              placeholder="Enter project details"
              value={formData.detail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="projectDate">Project Date</label>
            <input
              type="date"
              id="projectDate"
              name="projectDate"
              value={formData.projectDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="liveSiteLink">Live Site Link</label>
            <input
              type="text"
              id="liveSiteLink"
              name="liveSiteLink"
              placeholder="Enter live site URL"
              value={formData.liveSiteLink}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="githubLink">GitHub Link</label>
            <input
              type="text"
              id="githubLink"
              name="githubLink"
              placeholder="Enter GitHub URL"
              value={formData.githubLink}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="skills">Skills</label>
            <select
              id="skills"
              name="skills"
              multiple
              value={formData.skillIds}
              onChange={handleSkillChange}
            >
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
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

export default ProjectForm;
