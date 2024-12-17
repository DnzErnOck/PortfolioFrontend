import axios from "axios";
import { BASE_URL } from "@/config/config";
 
export const fetchExperiences = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/experiences`);
        return response.data;
    }
    catch(error){
        console.error("Experince alınırken hata oluştu:", error);
        return [];
    }
};