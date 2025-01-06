import { BASE_API } from "@/config/axiosInstances";

export const downloadResume = async (): Promise<void> => {
  try {
    const response = await BASE_API.get("/resumes/download", {
      responseType: "blob", // Blob formatında veri almak için
    });

    // Tarayıcıda dosya oluşturma ve indirme işlemi
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // İndirme dosya adı
    link.setAttribute("download", "resume.pdf");

    // Linki DOM'a ekleyip tıklama işlemi başlatılır
    document.body.appendChild(link);
    link.click();

    // Link DOM'dan kaldırılır
    document.body.removeChild(link);
  } catch (error) {
    console.error("Özgeçmiş indirilirken bir hata oluştu:", error);
    throw new Error("Failed to download resume.");
  }
};
