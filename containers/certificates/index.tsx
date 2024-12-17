"use client"

import React, { useEffect, useState } from "react";
import { fetchCertificates } from "../../services/certificateService";
import styles from "./certificate.module.css";

interface Certificate {
  id: number;
  name: string;
  organisationName: string;
  givenDate: string;
  certificateSiteLink: string;
  serialNumber: string;
  imageBase64: string;
}

const CertificatesContainer: React.FC = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
  
    useEffect(() => {
      const getCertificates = async () => {
        try {
          const data = await fetchCertificates();
          setCertificates(data);
        } catch (error) {
          console.error("Error fetching certificates:", error);
        }
      };
      getCertificates();
    }, []);
  
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>My Certificates</h1>
        <div className={styles.certificatesGrid}>
          {certificates.map((cert) => (
            <div key={cert.id} className={styles.certificateCard}>
              {/* Certificate Image */}
              <div className={styles.imageContainer}>
                <img
                  src={cert.imageBase64}
                  alt={cert.name}
                  className={styles.certificateImage}
                />
              </div>
              {/* Certificate Details */}
              <div className={styles.certificateContent}>
                <h2 className={styles.name}>{cert.name}</h2>
                <h3 className={styles.organisation}>{cert.organisationName}</h3>
                <p className={styles.date}>
                  {new Date(cert.givenDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
                <p className={styles.serial}>Serial: {cert.serialNumber}</p>
                <a
                    href={cert.certificateSiteLink.startsWith("http") ? cert.certificateSiteLink : `https://${cert.certificateSiteLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CertificatesContainer;