import { BASE_API, API } from "@/config/axiosInstances";

export interface Education {
  id: number;
  name: string;
  startDate: string;
  finishDate: string;
  major: string;
}

export const EducationService = {
  /**
   * Tüm eğitimleri getir (yetkilendirme gereksiz)
   */
  async fetchEducations(): Promise<Education[]> {
    try {
      const response = await BASE_API.get<Education[]>("/educations");
      return response.data;
    } catch (error) {
      console.error("Education alınırken hata oluştu:", error);
      return [];
    }
  },

  /**
   * ID ile eğitim detayını getir (yetkilendirme gereksiz)
   */
  async getEducationById(educationId: number): Promise<Education> {
    try {
      const response = await BASE_API.get<Education>(`/educations/${educationId}`);
      return response.data;
    } catch (error) {
      console.error("Education bilgisi alınırken hata oluştu:", error);
      throw new Error("Failed to fetch the education information.");
    }
  },

  /**
   * Yeni eğitim oluştur (yetkilendirme gerekli)
   */
  async createEducation(educationData: Omit<Education, "id">): Promise<void> {
    try {
      await API.post("/educations", educationData);
    } catch (error) {
      console.error("Education oluşturulurken hata oluştu:", error);
      throw new Error("Failed to create the education.");
    }
  },

  /**
   * Eğitim bilgilerini güncelle (yetkilendirme gerekli)
   */
  async updateEducation(updateData: { id: number } & Partial<Education>): Promise<void> {
    try {
      await API.put("/educations", updateData);
    } catch (error) {
      console.error("Education güncellenirken hata oluştu:", error);
      throw new Error("Failed to update the education.");
    }
  },

  /**
   * Eğitim bilgisini sil (yetkilendirme gerekli)
   */
  async deleteEducation(educationId: number): Promise<void> {
    try {
      await API.delete(`/educations/${educationId}`);
    } catch (error) {
      console.error("Education silinirken hata oluştu:", error);
      throw new Error("Failed to delete the education.");
    }
  },
};
