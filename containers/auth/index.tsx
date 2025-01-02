"use client"
import { fetchAuth } from "@/services/authService";
import React, { useEffect, useState } from "react";
import styles from "./auth.module.css";




const AuthContainer: React.FC = () => {
  const [key, setKey] = useState();

  useEffect(() => {
    const getKey = async () => {
      const data = await fetchAuth();
      setKey(data);
    };
    getKey();
  }, []);

  return (
    <div className={styles.container}>
     {key}
    </div>
  );
};



export default AuthContainer;
