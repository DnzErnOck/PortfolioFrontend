import React from "react";
import styles from "./page.module.css";
import EducationContainer from "@/containers/education";
import LanguageContainer from "@/containers/language";

const EducationLanguagePage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.containerStyle}>
        <EducationContainer />
        <LanguageContainer />
      </div>
    </div>
  );
};

export default EducationLanguagePage;
