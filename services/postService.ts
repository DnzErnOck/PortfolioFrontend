import { BASE_URL } from "@/config/config";
import axios from "axios";

// Create Post API
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

// Fetch Posts with Pagination API
export const fetchPosts = async (
  page: number = 0,
  size: number = 10,
  search: string = "",
  sort:string = ""
) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      params: {
        page,
        size,
        search,
        sort
      },
    });
    return response.data; // Backend'in döndüğü sayfalama bilgilerini döndür
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
