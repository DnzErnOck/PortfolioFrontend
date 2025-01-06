import axios from "axios";
import { BASE_API } from "@/config/axiosInstances";

export const fetchCertificates = async () => {
    try{
        const response = await BASE_API.get(`/certificates`);
        return response.data;
    }
    catch(error){
        console.error("Certificate alınırken hata oluştu:", error);
        return [];
    }
  };
  