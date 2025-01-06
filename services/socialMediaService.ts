import { BASE_API } from "@/config/axiosInstances";

export const SocialMediaService = {
  /**
   * Fetch all social media data.
   * @returns {Promise<any[]>} Array of social media data or an empty array if an error occurs.
   */
  async getAllSocialMedias(): Promise<any[]> {
    try {
      const response = await BASE_API.get("/socialMedias");
      return response.data;
    } catch (error) {
      console.error("Sosyal medya verileri alınırken hata oluştu:", error);
      return [];
    }
  },
};
