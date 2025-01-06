"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./postEditor.module.css";
import TitleInput from "@/components/PostEditor/TitleInput";
import PostToolbar from "@/components/PostEditor/PostToolbar";
import ContentArea from "@/components/PostEditor/ContentArea";
import { PostService } from "@/services/postService";

interface PostEditorContainerProps {
  onSaveSuccess?: () => void; // Başarı callback'i
}

const PostEditorContainer: React.FC<PostEditorContainerProps> = ({ onSaveSuccess }) => {
  const router = useRouter(); // Yönlendirme için
  const [title, setTitle] = useState<string>(""); // Başlık için state
  const [contents, setContents] = useState<{ type: string; value: string }[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Resim dosyaları için state
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // Popup mesajı
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // Başarı durumu

  const handleAddContent = (type: string) => {
    setContents([...contents, { type, value: "" }]);
  };

  const handleChangeContent = (index: number, value: string) => {
    const updatedContents = [...contents];
    updatedContents[index].value = value;
    setContents(updatedContents);
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (file) {
      const updatedContents = [...contents];
      updatedContents[index].value = file.name; // İçeriği dosya adı olarak ayarla
      updatedContents[index].type = "IMAGE"; // Tip IMAGE olarak ayarla
      setContents(updatedContents);
      setImageFiles([...imageFiles, file]); // Dosyayı ekle
    }
  };

  const handleRemoveContent = (index: number) => {
    const updatedContents = contents.filter((_, i) => i !== index);
    setContents(updatedContents);
  };

  const handleSave = async () => {
    // FormData nesnesi oluştur
    const formData = new FormData();
    const postRequest = {
      title: title || "Untitled Post",
      active: true,
      elements: contents.map((content) => ({
        type: content.type,
        content: content.value,
      })),
    };
    formData.append("body", JSON.stringify(postRequest));
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await PostService.createPost(formData);
      console.log("Post saved successfully:", response);
      setPopupMessage("Post saved successfully!");
      setIsSuccess(true);

      // 2 saniye sonra yönlendirme
      setTimeout(() => {
        if (onSaveSuccess) onSaveSuccess();
        router.push("/posts"); // Yönlendirme yapılacak sayfa
      }, 2000);
    } catch (error) {
      console.error("Error saving post:", error);
      setPopupMessage("Failed to save the post. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <div className={styles.editorContainer}>
      {/* Popup Mesajı */}
      {popupMessage && (
        <div
          className={`${styles.popup} ${isSuccess ? styles.success : styles.error}`}
        >
          {popupMessage}
        </div>
      )}

      <div className={styles.toolbar}>
        <PostToolbar onAddContent={handleAddContent} />
      </div>
      <TitleInput value={title} onChange={(value) => setTitle(value)} />
      <ContentArea
        contents={contents}
        onChangeContent={handleChangeContent}
        onFileChange={handleFileChange}
        onRemoveContent={handleRemoveContent}
      />
      <button className={styles.saveButton} onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default PostEditorContainer;
