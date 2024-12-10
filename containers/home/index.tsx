"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./home.module.css";
import TextSpan from "@/components/TextSpan";
import SocialMediaIcons from "@/components/SocialMedia/SocialMediaIcons";
import { downloadResume } from "@/services/resumeService"
const Home = () => {
  const name = "Deniz Eren Ocak Kırıtoğlu Alp".split("");
  const handleDownloadResume = () => {
    downloadResume(); // ResumeService çağrılıyor
  };
  return (
    <section>
      <div className={styles.container}>
        {/* Hoş Geldiniz */}
        <div className={styles.greetingText}>Hi 👋, my name is</div>

        {/* Kullanıcı Adı */}
        <div className={styles.nameText}>
          {name.map((letter, index) => (
            <TextSpan key={index}>{letter === " " ? "\u00A0" : letter}</TextSpan>
          ))}
        </div>

        {/* Typewriter Efekt */}
        <div className={styles.typingText}>
          <span><b>I'm a</b> </span>
          
          <Typewriter
            words={["Frontend Developer", "Game Developer", "Graphic Designer"]}
            typeSpeed={50}
            deleteSpeed={50}
            delaySpeed={2000}
            loop={true}
          />
        </div>
        <SocialMediaIcons />
         {/* Resume Butonu */}
         <button onClick={handleDownloadResume} className={styles.resumeButton}>
            Download Resume
          </button>
      </div>
    </section>
  );
};

export default Home;
