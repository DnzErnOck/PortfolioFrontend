import axios from "axios";
import { BASE_URL } from "@/config/config";

export const fetchCourses  = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/courses`);
        return response.data;
    }
    catch(error){
        console.error("Kurslar çekilirken hata oluştu:", error);
        return [];
    }
  };
  