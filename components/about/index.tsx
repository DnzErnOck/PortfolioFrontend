"use client";
import React, { useEffect, useState } from "react";
import { UserService } from "@/services/userService"; // Kullanıcı servisi, bilgileri almak için.
import styles from "./about.module.css"; // CSS dosyasını import ediyoruz
import Image from "next/image"; // next/image bileşenini import ettik
import image from '../../images/about_avata.jpg'; // Resmi import ettik

const About = () => {
  const [aboutMe, setAboutMe] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.getUser();
      const { aboutMe } = user;
      setAboutMe(aboutMe);
    };

    fetchUser();
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Sol tarafta resim */}
        <div className={styles.imageContainer}>
          <Image
            src={image} // Resmi next/image ile doğru şekilde gösteriyoruz
            alt="Profile Picture"
            className={styles.profileImage}
            width={150} // Genişlik
            height={150} // Yükseklik
          />
        </div>

        {/* Sağ tarafta başlık ve about metni */}
        <div className={styles.textContainer}>
          <h2 className={styles.heading}>About Me</h2>
          <p className={styles.aboutText}>
            {aboutMe || "No about information available."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
