import { BASE_API,API } from "@/config/axiosInstances";

export const ResumeService = {
  async checkResumeExists(): Promise<boolean> {
    try {
      const response = await BASE_API.get("/resumes/exists");
      return response.data; // Backend'den gelen true/false değeri
    } catch (error) {
      console.error("Resume existence check failed:", error);
      return false; // Hata durumunda varsayılan olarak false döner
    }
  },

  async downloadResume(): Promise<void> {
    try {
      const response = await BASE_API.get("/resumes/download", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
      throw new Error("Failed to download resume.");
    }
  },

  /**
   * Upload resume file.
   * @param file - Resume file to upload.
   */
  async uploadResume(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("documents", file);

      const response = await API.post("/resumes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error uploading resume:", error);
      throw new Error("Failed to upload resume.");
    }
  },
  /**
 * Özgeçmiş bilgilerini getirir.
 * @returns {Promise<{ exists: boolean; name: string }>} Özgeçmiş bilgileri.
 */
async getResumeInfo(): Promise<{ exists: boolean; name: string }> {
  try {
    const response = await BASE_API.get("/resumes/info");
    return {
      exists: response.data.exists === "true", // Backend'den gelen string'i boolean'a çevir
      name: response.data.name || "", // Eğer ad mevcut değilse boş string
    };
  } catch (error) {
    console.error("Error fetching resume info:", error);
    return { exists: false, name: "" }; // Hata durumunda varsayılan değerler
  }
}

};
