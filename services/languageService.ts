import axios from "axios";
import { BASE_URL } from "@/config/config";

export const fetchLanguages  = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/language`);
        return response.data;
    }
    catch(error){
        console.error("Language alınırken hata oluştu:", error);
        return [];
    }
  };
  