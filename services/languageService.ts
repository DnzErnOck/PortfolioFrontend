import { BASE_API, API } from "@/config/axiosInstances";

export interface Language {
  id: number;
  name: string;
  languageLevel: string; // A1, B2 gibi seviyeler
  levelId:string;
}

export const LanguageService = {
  /**
   * Tüm dilleri getir (yetkilendirme gereksiz)
   */
  async fetchLanguages(): Promise<Language[]> {
    try {
      const response = await BASE_API.get<Language[]>("/language");
      return response.data;
    } catch (error) {
      console.error("Language alınırken hata oluştu:", error);
      return [];
    }
  },

  /**
   * ID ile dil detayını getir (yetkilendirme gereksiz)
   */
  async getLanguageById(languageId: number): Promise<Language> {
    try {
      const response = await BASE_API.get<Language>(`/languages/${languageId}`);
      return response.data;
    } catch (error) {
      console.error("Dil bilgisi alınırken hata oluştu:", error);
      throw new Error("Failed to fetch the language information.");
    }
  },

  /**
   * Yeni dil oluştur (yetkilendirme gerekli)
   */
  async createLanguage(languageData: Omit<Language, "id">): Promise<void> {
    try {
      await API.post("/language", languageData);
    } catch (error) {
      console.error("Language oluşturulurken hata oluştu:", error);
      throw new Error("Failed to create the language.");
    }
  },

  /**
   * Dil bilgilerini güncelle (yetkilendirme gerekli)
   */
  async updateLanguage(updateData: { id: number } & Partial<Language>): Promise<void> {
    try {
      await API.put("/language", updateData);
    } catch (error) {
      console.error("Language güncellenirken hata oluştu:", error);
      throw new Error("Failed to update the language.");
    }
  },

  /**
   * Dil bilgisini sil (yetkilendirme gerekli)
   */
  async deleteLanguage(languageId: number): Promise<void> {
    try {
      await API.delete(`/language/${languageId}`);
    } catch (error) {
      console.error("Language silinirken hata oluştu:", error);
      throw new Error("Failed to delete the language.");
    }
  },
};
