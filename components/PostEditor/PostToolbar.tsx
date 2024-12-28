import React from "react";
import styles from "./PostToolbar.module.css";
import { FiEdit, FiImage, FiCode } from "react-icons/fi";

interface PostToolbarProps {
  onAddContent: (type: string) => void;
}

const PostToolbar: React.FC<PostToolbarProps> = ({ onAddContent }) => {
  return (
    <div className={styles.toolbar}>
      <button
        className={styles.toolbarButton}
        onClick={() => onAddContent("TEXT")}
      >
        <FiEdit className={styles.icon} />
        <span>Text</span>
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => onAddContent("IMAGE")}
      >
        <FiImage className={styles.icon} />
        <span>Image</span>
      </button>
      <button
        className={styles.toolbarButton}
        onClick={() => onAddContent("CODE")}
      >
        <FiCode className={styles.icon} />
        <span>Code</span>
      </button>
    </div>
  );
};

export default PostToolbar;
