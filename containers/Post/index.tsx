"use client";
import React, { useState, useEffect } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"; // FontAwesome'dan ikonlar
import styles from "./postList.module.css";
import { PostService } from "@/services/postService";

const extractFirstParagraph = (elements: any[] | undefined) => {
  if (!elements || elements.length === 0) return "No preview available";
  const textContent = elements.find((content) => content.contentType === "TEXT");
  return textContent?.content.split("\n")[0] || "No preview available";
};

const extractFirstImage = (contents: any[] | undefined): string | undefined => {
  if (!contents || contents.length === 0) return undefined;
  const imageContent = contents.find((content) => content.contentType === "IMAGE");
  if (!imageContent?.imageBase64) return undefined;
  return `${imageContent.imageBase64}`;
};

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("desc"); // Default sorting
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PostService.getAll(page, 10); // Sayfalama ve sıralama
      setPosts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, [page, search, sort]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0); // Arama değiştiğinde sayfayı sıfırla
  };

  const toggleSort = () => {
    setSort(sort === "desc" ? "asc" : "desc");
    setPage(0); // Sıralama değiştiğinde sayfayı sıfırla
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className={styles.postListContainer}>
      <h1 className={styles.header}>Posts</h1>
      <div className={styles.controls}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search posts..."
          value={search}
          onChange={handleSearchChange}
        />
        <button className={styles.sortButton} onClick={toggleSort}>
          {sort === "desc" ? (
            <FaSortAmountDown className={styles.sortIcon} title="Newest to Oldest" />
          ) : (
            <FaSortAmountUp className={styles.sortIcon} title="Oldest to Newest" />
          )}
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
              <li key={post.id} className={styles.postItem}>
                {extractFirstImage(post.contents) && (
                  <img
                    src={extractFirstImage(post.contents)}
                    alt={post.title || "Post image"}
                    className={styles.postImage}
                  />
                )}
                <div className={styles.postContent}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDate}>
                    {new Date(post.createdDate).toLocaleDateString()}
                  </p>
                  <p className={styles.postPreview}>
                    {extractFirstParagraph(post.contents)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={handlePreviousPage}
              disabled={page === 0}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              className={styles.pageButton}
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
