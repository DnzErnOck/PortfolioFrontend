"use client";
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./home.module.css";
import TextSpan from "@/components/TextSpan";
import SocialMediaIcons from "@/components/SocialMedia/SocialMediaIcons";
import { ResumeService } from "@/services/resumeService"
import { UserService } from "@/services/userService";
import About from "@/components/about";
import Skill from "@/components/skill/skill";
import { Download } from "lucide-react";


const Home = () => {
  const [fullName, setFullName] = useState<string[]>([]); // Tip belirtildi
  const [detail, setDetail] = useState<string>(""); 
    // Kullanıcıyı getirme işlemi
    useEffect(() => {
      const fetchUserName = async () => {
        try {
          const user = await UserService.getUser(); // getUser çağrısı
          const { name, surname, detail } = user; // name, surname ve detail alanlarını al
          const combinedName = `${name} ${surname}`; // İsim ve soyadı birleştir
          setFullName(combinedName.split("")); // Harf harf ayır ve state'e aktar
          setDetail(detail); // Detail'i state'e aktar
        } catch (error) {
          console.error("Kullanıcı bilgisi alınırken hata oluştu:", error);
        }
      };
  
      fetchUserName(); // Fonksiyonu çağır
    }, []);

  
  const handleDownloadResume = () => {
    ResumeService.downloadResume(); // ResumeService çağrılıyor
  };
  
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.namePart}>
          {/* Hoş Geldiniz */}
          <div className={styles.greetingText}>Hi 👋, my name is</div>

          {/* Kullanıcı Adı */}
          <div className={styles.nameText}>
            {fullName.map((letter, index) => (
              <TextSpan key={index}>{letter === " " ? "\u00A0" : letter}</TextSpan>
            ))}
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
          <About/>
        </div>
        <div id="skill">
          <Skill />
        </div>
        
      </div>
    </section>
  );
};

export default Home;
