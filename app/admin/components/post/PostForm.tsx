"use client";

import React, { useEffect, useState } from "react";
import styles from "./postEditor.module.css";
import TitleInput from "@/components/PostEditor/TitleInput";
import PostToolbar from "@/components/PostEditor/PostToolbar";
import ContentArea from "@/components/PostEditor/ContentArea";

interface PostFormProps {
  initialData?: {
    id?: number;
    title: string;
    elements: { id:number,contentType: string; content: string,imageBase64:string,isGetNewPicture:boolean }[];
    isActive: boolean; // Aktif durumu
  };
  onSaveSuccess: (post: any) => void; // Kaydetme işlemi başarılı olduğunda çağrılacak fonksiyon
  onCancel: () => void; // İptal işlemi
}

const PostForm: React.FC<PostFormProps> = ({ initialData, onSaveSuccess, onCancel }) => {
  const [title, setTitle] = useState<string>(initialData?.title || ""); // Başlık için state
  const [elements, setElements] = useState<{ id:number,contentType: string; content: string,isGetNewPicture:boolean }[]>(
    initialData?.elements || []
  ); // İçerikler için state
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Resim dosyaları için state
  const [isActive, setIsActive] = useState<boolean>(initialData?.isActive || true); // Aktiflik durumu
  const [deletedElements, setDeletedElements] = useState<number[]>([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      // Eğer `imageBase64` varsa onu koruyarak elements güncelleniyor
      const updatedElements = initialData.elements.map((element) =>
        element.contentType === "IMAGE"
          ? { ...element,id:element.id, content: element.content, imageBase64: element.imageBase64 }
          : element
      );
      setElements(updatedElements);
      setIsActive(initialData.isActive ?? true);
    }
  }, [initialData]);
  
  

  const handleAddContent = (contentType: string) => {
    const tempId = -(Math.floor(Math.random() * 100) + 1);
    setElements([
      ...elements,
      {
        id: tempId, // Geçici bir ID
        contentType,
        content: "",
        isGetNewPicture: false,
      },
    ]);
    
  };
  

  const handleChangeContent = (index: number, value: string) => {
    const updatedContents = [...elements];
    updatedContents[index].content = value;
    setElements(updatedContents);
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (file) {
      const updatedContents = [...elements];
      updatedContents[index].content = file.name; // İçeriği dosya adı olarak ayarla
      updatedContents[index].contentType = "IMAGE"; // Tip IMAGE olarak ayarla
      setElements(updatedContents);
      setImageFiles([...imageFiles, file]); // Dosyayı ekle
    }
  };

  const handleRemoveContent = (index: number) => {
    const elementId = elements[index]?.id; // Silinecek içeriğin ID'sini al
    if (elementId && elementId > 0) { 
      setDeletedElements([...deletedElements, elementId]); // Pozitif ID'leri silinenlere ekle
    }
    setElements(elements.filter((_, i) => i !== index)); // Görsel olarak kaldır
  };
  

  const handleSubmit = () => {
    const postData = {
      id: initialData?.id, // Post ID
      title: title || "Untitled Post",
      isActive,
      deletedElements,
      elements: elements.map((element, index) => ({
        id: element.id || initialData?.elements[index]?.id || null, // Mevcut ID'yi al veya null
        contentType: element.contentType,
        content: element.content,
        isGetNewPicture:
          element.contentType === "IMAGE" &&
          !!imageFiles.find((file) => file.name === element.content),
      })),
      imageFiles,
    };
    onSaveSuccess(postData); // Post verilerini üst bileşene gönder
  };
  
  

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <PostToolbar onAddContent={handleAddContent} />
      </div>
      <div className={styles.contentArea}>
        <TitleInput value={title} onChange={(value) => setTitle(value)} />
        <ContentArea
            contents={elements}
            onChangeContent={(index, value) => {
                handleChangeContent(index, value);
            }}
            onFileChange={handleFileChange}
            onRemoveContent={handleRemoveContent}
            />

        <div className={styles.activeToggle}>
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Aktif
          </label>
        </div>
        <div className={styles.formActions}>
          <button type="button" className={styles.submitButton} onClick={handleSubmit}>
            {initialData ? "Update" : "Submit"}
          </button>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
