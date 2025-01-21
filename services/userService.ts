import { BASE_API ,API} from "@/config/axiosInstances";

export const UserService = {
  /**
   * Fetch user data by ID.
   * Defaults to fetching the user with ID 1.
   * @param {number} userId - The ID of the user to fetch.
   * @returns {Promise<any>} User data or null if an error occurs.
   */
  async getUser(userId: number = 1): Promise<any> {
    try {
      const response = await BASE_API.get(`/users`, {
        params: { id: userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  },

  /**
   * Update user data.
   * @param {any} userData - The user data to update.
   * @returns {Promise<boolean>} True if the update succeeds, otherwise false.
   */
  async updateUser(userData: any): Promise<boolean> {
    try {
      await API.put(`/users`, userData);
      return true;
    } catch (error) {
      console.error("Error updating user data:", error);
      return false;
    }
  },
};
