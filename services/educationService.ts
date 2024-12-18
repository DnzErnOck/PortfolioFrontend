import axios from "axios";
import { BASE_URL } from "@/config/config";

export const fetchEducations  = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/educations`);
        return response.data;
    }
    catch(error){
        console.error("Education alınırken hata oluştu:", error);
        return [];
    }
  };
  