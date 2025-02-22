
import CertificatesContainer from '@/containers/certificates';
import { CertificateService } from '@/services/certificateService';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Sertifikaların tümünü alıyoruz
    const data = await CertificateService.getAll();
    const certificateNames = data.content.map((cert) => cert.name).join(", "); // Sertifikaların isimlerini virgülle ayırarak alıyoruz

    return {
      description: `Explore the certificates I have earned, including: ${certificateNames}`, // Sertifikaların isimlerini açıklama olarak kullanıyoruz
      keywords: certificateNames, // SEO açısından sertifika isimlerini anahtar kelime olarak ekliyoruz
    };
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return {
      title: `Certificates - My Portfolio`,
      description: "My Certificates", // Hata durumunda sabit açıklama
    };
  }
}

const CertificatesPage: React.FC = () => {
  return <CertificatesContainer />;
};

export default CertificatesPage;