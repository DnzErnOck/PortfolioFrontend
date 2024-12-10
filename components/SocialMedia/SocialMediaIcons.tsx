import React, { useEffect, useState } from "react";
import { getAllSocialMedias } from "@/services/socialMediaService";
import styles from "./socialMediaIcons.module.css";

type SocialMedia = {
  id: number;
  imageBase64: string;
  name: string;
  link: string;
};

const SocialMediaIcons = () => {
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllSocialMedias();
      setSocialMedias(data);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.socialContainer}>
      {socialMedias.map((socialMedia) => (
        <a
          key={socialMedia.id}
          href={socialMedia.link}
          className={styles.socialIcon}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={socialMedia.imageBase64}
            alt={socialMedia.name}
            className={styles.iconImage}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
