import React from "react";
import styles from "./titleInput.module.css";

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your title here..."
      className={styles.titleInput}
    />
  );
};

export default TitleInput;
