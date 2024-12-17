import axios from "axios";
import { BASE_URL } from "@/config/config";

export const fetchCertificates = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/certificates`);
        return response.data;
    }
    catch(error){
        console.error("Certificate alınırken hata oluştu:", error);
        return [];
    }
  };
  