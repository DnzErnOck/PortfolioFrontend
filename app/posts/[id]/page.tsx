"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Eğer Next.js kullanıyorsanız
import { PostService } from "@/services/postService";
import styles from "./postDetail.module.css";

const PostDetail: React.FC = () => {
  const { id } = useParams(); // URL'den Post ID al
  const router = useRouter(); // Geri dönüş için router kullan
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await PostService.getById(Number(id)); // ID'yi kullanarak post detaylarını al
        setPost(data);
      } catch (err) {
        setError("Post detayları alınamadı. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.postDetailContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        Geri
      </button>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <p className={styles.postDate}>
        {new Date(post.createdDate).toLocaleDateString()}
      </p>
      <div className={styles.postContent}>
        {post.elements.map((element: any) =>
          element.contentType === "TEXT" ? (
            <p key={element.id} className={styles.postText}>
              {element.content}
            </p>
          ) : element.contentType === "IMAGE" && element.imageBase64 ? (
            <img
              key={element.id}
              src={element.imageBase64}
              alt="Post Image"
              className={styles.postImage}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default PostDetail;
