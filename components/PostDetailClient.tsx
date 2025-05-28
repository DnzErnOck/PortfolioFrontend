"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { PostService } from "@/services/postService";
import styles from "../app/posts/[id]/postDetail.module.css";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-light.css"; // Highlight.js style
import Image from 'next/image';
const ReactMarkdown = lazy(() => import("react-markdown"));

const PostDetailClient: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await PostService.getById(Number(id));
        setPost(data);
      } catch (err) {
        setError("Post detayları alınamadı. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && post.elements.some((e: any) => e.contentType === "CODE")) {
      const codeBlocks = document.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [post]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.postDetailContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <span className={styles.backIcon}>←</span> Back
      </button>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <p className={styles.postDate}>
        {new Date(post.createdDate).toLocaleDateString()}
      </p>
      <div className={styles.postContent}>
        {post.elements.map((element: any) =>
          element.contentType === "TEXT" ? (
            <div key={element.id} className={styles.postText}>
              <Suspense fallback={<span>Loading...</span>}>
                <ReactMarkdown>{element.content}</ReactMarkdown>
              </Suspense>
            </div>
          ) : element.contentType === "IMAGE" && element.imageBase64 ? (
            <>
              <Image
                key={element.id}
                src={element.imageBase64}
                alt="Post Image"
                className={styles.postImage}
                width={200}
                height={400}
                unoptimized
                onClick={() => setModalImage(element.imageBase64)}
                style={{ cursor: 'pointer' }}
              />
              {modalImage === element.imageBase64 && (
                <div className={styles.imageModalOverlay} onClick={() => setModalImage(null)}>
                  <div className={styles.imageModal} onClick={e => e.stopPropagation()}>
                    <button className={styles.closeModal} onClick={() => setModalImage(null)}>&times;</button>
                    <img src={modalImage || ''} alt="Büyük Görsel" className={styles.modalImg} />
                  </div>
                </div>
              )}
            </>
          ) : element.contentType === "CODE" ? (
            <pre key={element.id} className={styles.postCode}>
              <code className="language-javascript">{element.content}</code>
            </pre>
          ) : null
        )}
      </div>
    </div>
  );
};

export default PostDetailClient;
