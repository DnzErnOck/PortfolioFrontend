import axios from "axios";
import { BASE_URL } from "@/config/config";

export const fetchAuth = async () => {
    try{
        const response = await axios.post(`${BASE_URL}/auth/createSecretPass`);
        return response.data;
    }
    catch(error){
        console.error("Şİfre alınırken hata oluştu:", error);
        return [];
    }
  };