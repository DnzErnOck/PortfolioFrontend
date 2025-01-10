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

export interface PagedResponse<T> {
  content: T[]; // Dizi, sayfalı sonuçların içeriğini temsil eder
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const ExperienceService = {
  /**
   * Tüm deneyimleri getir (yetkilendirme gereksiz)
   * Sayfalama desteği eklendi
   */
  async fetchExperiences(page: number = 0, size: number = 10): Promise<PagedResponse<Experience>> {
    try {
      const response = await BASE_API.get<PagedResponse<Experience>>("/experiences", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Experiences alınırken hata oluştu:", error);
      throw new Error("Failed to fetch experiences.");
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
  async updateExperience(updateData: { id: number } & Partial<Experience>): Promise<void> {
    try {
      await API.put("/experiences", updateData);
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
