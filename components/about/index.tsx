"use client";
import React, { useEffect, useState } from "react";
import { UserService } from "@/services/userService";
import styles from "./about.module.css";
import { motion } from "framer-motion";

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
    <motion.section 
      className={styles.aboutSection}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <motion.h2 
            className={styles.heading}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>About Me</span>
          </motion.h2>
        </div>

        <motion.div 
          className={styles.textContainer}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className={styles.aboutText}>
            {aboutMe || "No about information available."}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;