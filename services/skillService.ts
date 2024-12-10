import axios from "axios";
import { BASE_URL } from "@/config/config";


export const getSkills = async () => {
    try {
      const skills = await axios.get(`${BASE_URL}/skills`);
      return skills.data;
    } catch (error) {
      console.error("Skiller alınırken hata oluştu:", error);
      return [];
    }
  };