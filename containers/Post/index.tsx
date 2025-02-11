"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Yönlendirme için
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import styles from "./postList.module.css";
import { PostService } from "@/services/postService";

const extractContent = (elements: any[] | undefined, maxLength: number = 100) => {
  if (!elements || elements.length === 0) return "No content available";

  // Combine all TEXT contents
  const textContents = elements
    .filter((content) => content.contentType === "TEXT")
    .map((content) => content.content)
    .join(" ");

  // Truncate content if it exceeds maxLength
  if (textContents.length > maxLength) {
    return textContents.slice(0, maxLength) + "...";
  }

  return textContents || "No content available";
};

const extractFirstImage = (contents: any[] | undefined): string | undefined => {
  if (!contents || contents.length === 0) return undefined;
  const imageContent = contents.find((content) => content.contentType === "IMAGE");
  if (!imageContent?.imageBase64) return undefined;
  return `${imageContent.imageBase64}`;
};

const PostList: React.FC = () => {
  const router = useRouter(); // useRouter hook'u
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("desc");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PostService.getAll(page - 1, 3, search, sort, true);
      setPosts(data.content);
      console.log("data", data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Gönderiler alınamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, [page, search, sort]);

  /* const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const toggleSort = () => {
    setSort(sort === "desc" ? "asc" : "desc");
    setPage(0);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePostClick = (id: number) => {
    router.push(`/posts/${id}`);
  }; */

  return (
    <div className={styles.postListContainer}>
      <h1 className={styles.header}>Posts</h1>
      <div className={styles.controls}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <button className={styles.sortButton} onClick={() => setSort(sort === "desc" ? "asc" : "desc")}>
          {sort === "desc" ? <FaSortAmountDown title="Newest to Oldest" /> : <FaSortAmountUp title="Oldest to Newest" />}
        </button>
      </div>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          <ul className={styles.postList}>
          {posts.map((post) => (
              <li key={post.id} className={styles.postItem} onClick={() => router.push(`/posts/${post.id}`)}>
                {extractFirstImage(post.elements) && <img src={extractFirstImage(post.elements)} alt={post.title} className={styles.postImage} />}
                {/* {extractFirstImage(post.elements) && (
                  <img
                    src={extractFirstImage(post.elements)}
                    alt={post.title || "Post image"}
                    className={styles.postImage}
                  />
                )} */}
                <div className={styles.postContent}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDate}>
                    {new Date(post.createdDate).toLocaleDateString()}
                  </p>
                  <p className={styles.postPreview}>
                    {extractContent(post.elements)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.pagination}>
            <button className={`${styles.pageButton} ${page === 1 ? styles.disabled : ""}`} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
              ⬅ Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} className={`${styles.pageButton} ${page === index + 1 ? styles.active : ""}`} onClick={() => setPage(index + 1)}>
                {index + 1}
              </button>
            ))}

            <button className={`${styles.pageButton} ${page === totalPages ? styles.disabled : ""}`} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
