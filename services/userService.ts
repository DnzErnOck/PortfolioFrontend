import { BASE_API } from "@/config/axiosInstances";

export const UserService = {
  /**
   * Fetch user data.
   * @returns {Promise<any>} User data or an empty array if an error occurs.
   */
  async getUser(): Promise<any> {
    try {
      const response = await BASE_API.get("/users");
      return response.data;
    } catch (error) {
      console.error("Kullanıcı verileri alınırken hata oluştu:", error);
      return [];
    }
  },
};
