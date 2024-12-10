import axios from "axios";
import { BASE_URL } from "@/config/config";

export const getAllSocialMedias = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/socialMedias`);
    return response.data;
  } catch (error) {
    console.error("Sosyal medya verileri alınırken hata oluştu:", error);
    return [];
  }
};
