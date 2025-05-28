"use client";

import React, { useEffect, useState } from "react";
import { CertificateService } from "../../services/certificateService";
import styles from "./certificate.module.css";
import { Eye } from "lucide-react";


interface Certificate {
  id: number;
  name: string;
  organisationName: string;
  givenDate: string;
  certificateSiteLink?: string; // Opsiyonel
  serialNumber?: string; // Opsiyonel
  imageBase64: string;
}

const CertificatesContainer: React.FC = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    useEffect(() => {
        const getCertificates = async () => {
            try {
                const data = await CertificateService.getAll();

                const formattedCertificates: Certificate[] = data.content.map(cert => ({
                    id: cert.id,
                    name: cert.name,
                    organisationName: cert.organisationName,
                    givenDate: cert.givenDate,
                    certificateSiteLink: cert.certificateSiteLink || "", 
                    serialNumber: cert.serialNumber || "", 
                    imageBase64: cert.imageBase64 ?? "", 
                }));

                setCertificates(formattedCertificates);
            } catch (error) {
                console.error("Error fetching certificates:", error);
            }
        };
        getCertificates();
    }, []);

    return (
        <div className={styles.certificatesContainer}>
            <h1 className={styles.certificatesTitle}>My Certificates</h1>
            <div className={styles.certificatesGrid}>
                {certificates.map((cert) => (
                    <div key={cert.id} className={styles.certificateCard}>
                        {/* Sertifika Resmi */}
                        <div 
                            className={styles.certificateImageWrapper}
                        >
                            <img
                                src={cert.imageBase64}
                                alt={cert.name}
                                className={styles.certificateImage}
                            />
                        </div>

                        {/* Sertifika Detayları */}
                        <h2 className={styles.certificateName}>{cert.name}</h2>
                        <p className={styles.certificateInstitution}>{cert.organisationName}</p>
                        <p className={styles.certificateDate}>
                            {new Date(cert.givenDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                            })}
                        </p>
                        {cert.serialNumber && <p className={styles.certificateSerial}>Serial: {cert.serialNumber}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CertificatesContainer;
