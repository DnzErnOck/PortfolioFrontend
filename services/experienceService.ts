import { BASE_API, API } from "@/config/axiosInstances";

export interface Experience {
  id: number;
  departmentTitle: string;
  workplace: string;
  detail: string;
  position: string;
  startDate: string;
  finishDate: string | null; // Allow null for finishDate
}

export const ExperienceService = {
  /**
   * Tüm deneyimleri getir (yetkilendirme gereksiz)
   */
  async fetchExperiences(): Promise<Experience[]> {
    try {
      const response = await BASE_API.get<Experience[]>("/experiences");
      return response.data;
    } catch (error) {
      console.error("Experiences alınırken hata oluştu:", error);
      return [];
    }
  },

  /**
   * ID ile deneyim detayını getir (yetkilendirme gereksiz)
   */
  async getExperienceById(experienceId: number): Promise<Experience> {
    try {
      const response = await BASE_API.get<Experience>(`/experiences/${experienceId}`);
      return response.data;
    } catch (error) {
      console.error("Experience bilgisi alınırken hata oluştu:", error);
      throw new Error("Failed to fetch the experience information.");
    }
  },

  /**
   * Yeni deneyim oluştur (yetkilendirme gerekli)
   */
  async createExperience(experienceData: Omit<Experience, "id">): Promise<void> {
    try {
      await API.post("/experiences", experienceData);
    } catch (error) {
      console.error("Experience oluşturulurken hata oluştu:", error);
      throw new Error("Failed to create the experience.");
    }
  },

  /**
   * Deneyim bilgilerini güncelle (yetkilendirme gerekli)
   */
  async updateExperience(experienceId: number, experienceData: Partial<Experience>): Promise<void> {
    try {
      await API.put(`/experiences/${experienceId}`, experienceData);
    } catch (error) {
      console.error("Experience güncellenirken hata oluştu:", error);
      throw new Error("Failed to update the experience.");
    }
  },

  /**
   * Deneyim bilgisini sil (yetkilendirme gerekli)
   */
  async deleteExperience(experienceId: number): Promise<void> {
    try {
      await API.delete(`/experiences/${experienceId}`);
    } catch (error) {
      console.error("Experience silinirken hata oluştu:", error);
      throw new Error("Failed to delete the experience.");
    }
  },
};
