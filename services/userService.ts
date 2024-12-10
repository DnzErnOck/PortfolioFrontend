import axios from "axios";
import { BASE_URL } from "@/config/config";


export const getUser = async () => {
    try {
      const user = await axios.get(`${BASE_URL}/users`);
      return user.data;
    } catch (error) {
      console.error("Kullanıcı verileri alınırken hata oluştu:", error);
      return [];
    }
  };