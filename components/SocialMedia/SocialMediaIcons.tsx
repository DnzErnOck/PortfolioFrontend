import React, { useEffect, useState } from "react";
import { SocialMediaService } from "@/services/socialMediaService";
import styles from "./socialMediaIcons.module.css";

type SocialMedia = {
  id: number;
  imageBase64: string; // Zorunlu string
  name: string;
  link: string;
};

const SocialMediaIcons = () => {
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pagedResponse = await SocialMediaService.getAll();
        const data = pagedResponse.content.map((item) => ({
          id: item.id,
          imageBase64: item.imageBase64 || "", // Varsayılan bir değer atanıyor
          name: item.name,
          link: item.link,
        }));
        setSocialMedias(data); // Uygun türde veriler ayarlandı
      } catch (error) {
        console.error("Error fetching social medias:", error);
      }
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
