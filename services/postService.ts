
import { BASE_URL } from "@/config/config";
import axios from "axios";

export const createPosts = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
