"use client";

import { useEffect, useState } from "react";
import styles from "./PostContainer.module.css";
import { PostService } from "@/services/postService";
import PostTable from "../../components/post/PostTable";
import PostForm from "../../components/post/PostForm";

interface Notification {
  type: "success" | "error";
  message: string;
}

const PostContainer = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [notification, setNotification] = useState<Notification | null>(null);

  const loadPosts = async (page: number = 0) => {
    setLoading(true);
    try {
      const data = await PostService.getAll(page, 10); // Sayfa başına 10 öğe
      setPosts(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Postlar yüklenirken hata oluştu:", error);
      setNotification({ type: "error", message: "Postlar yüklenirken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (post: any): Promise<void> => {
    const formData = new FormData();
    const postRequest = {
      id: post.id,
      title: post.title || "Untitled Post",
      active: post.active,
      elements: post.elements.map((content: any) => ({
        id:content.id,
        contentType: content.contentType,
        content: content.content,
        isGetNewPicture:
          content.contentType === "IMAGE" &&
          !!post.imageFiles?.find((file: any) => file.name === content.content),
      })),
    };
  
    formData.append("body", JSON.stringify(postRequest));
  
    // `post.imageFiles` boş veya tanımsız ise bir fallback kullan
    const files = post.imageFiles || [];
    files.forEach((file: any) => {
      formData.append("images", file);
    });
  
    try {
      if (post.id) {
        await PostService.update(formData);
        showNotification({ type: "success", message: "Post başarıyla güncellendi." });
      } else {
        await PostService.create(formData);
        showNotification({ type: "success", message: "Post başarıyla oluşturuldu." });
      }
      loadPosts();
      setIsModalOpen(false);
      setSelectedPost(null);
    } catch (error) {
      console.error("Post kaydedilirken hata oluştu:", error);
      showNotification({ type: "error", message: "Post kaydedilemedi." });
    }
  };
  

  const handleDeletePost = async (id: number) => {
    try {
      await PostService.delete(id);
      const remainingPosts = posts.length - 1;
      const shouldLoadPreviousPage = remainingPosts === 0 && currentPage > 0;

      if (shouldLoadPreviousPage) {
        loadPosts(currentPage - 1);
      } else {
        loadPosts(currentPage);
      }

      showNotification({ type: "success", message: "Post başarıyla silindi." });
    } catch (error) {
      console.error("Post silinirken hata oluştu:", error);
      showNotification({ type: "error", message: "Post silinemedi." });
    }
  };

  const handlePageChange = (page: number) => {
    loadPosts(page);
  };

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Post Management</h1>
        <button
          className={styles.addButton}
          onClick={() => {
            setSelectedPost(null);
            setIsModalOpen(true);
          }}
        >
          + Add New Post
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

      <PostTable
        posts={posts}
        onEdit={(post) => {
          setSelectedPost(post);
          setIsModalOpen(true);
        }}
        onDelete={(id) => handleDeletePost(id)}
      />

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={`${styles.pageButton} ${currentPage === 0 ? styles.disabledButton : ""}`}
            onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ""}`}
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`${styles.pageButton} ${currentPage === totalPages - 1 ? styles.disabledButton : ""}`}
            onClick={() => currentPage < totalPages - 1 && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && (
        <PostForm
          initialData={selectedPost}
          onSaveSuccess={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
};

export default PostContainer;
