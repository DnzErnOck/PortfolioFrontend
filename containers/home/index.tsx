"use client"; 
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./home.module.css";
import TextSpan from "@/components/TextSpan";
import SocialMediaIcons from "@/components/SocialMedia/SocialMediaIcons";
import { ResumeService } from "@/services/resumeService";
import { UserService } from "@/services/userService";
import About from "@/components/about";
import Skill from "@/components/skill/skill";
import { Download } from "lucide-react";


 

const Home = () => {
  const [user, setUser] = useState<{ name: string; surname: string; detail: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await UserService.getUser(); 
        setUser(userData);
      } catch (error) {
        console.error("Kullanıcı bilgisi alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const handleDownloadResume = () => {
    ResumeService.downloadResume();
  };

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.namePart}>
          {/* Hoş Geldiniz */}
          <div className={styles.greetingText}>Hi 👋, my name is</div>

          {/* Kullanıcı Adı veya Yükleniyor Durumu */}
          <div className={styles.nameText}>
            {loading ? (
              <span>Loading...</span>
            ) : user ? (
              `${user.name} ${user.surname}`.split("").map((letter, index) => (
                <TextSpan key={index}>{letter === " " ? "\u00A0" : letter}</TextSpan>
              ))
            ) : (
              <span>Unknown User</span>
            )}
          </div>
          {/* Typewriter Efekt */}
          <div className={styles.typingText}>
            <span><b>I'm a</b> </span>
            <Typewriter
              words={["Frontend Developer", "Backend Developer", "Full-Stack Developer"]}
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={2000}
              loop={true}
            />
          </div>
          
          <SocialMediaIcons />
          
          {/* Resume Butonu */}
          <button onClick={handleDownloadResume} className={styles.resumeButton}>
            <span>Download Resume</span>
            <Download className={styles.downloadIcon} />
          </button>
        </div>

        <div id="about">
          <About />
        </div>
        
        <div id="skill">
          <Skill />
        </div>
      </div>
    </section>
  );
};

export default Home;

