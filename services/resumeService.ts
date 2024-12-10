import axios from "axios";
import { BASE_URL } from "@/config/config";


export const downloadResume = async (): Promise<void> => {
  
    const resumeUrl = `${BASE_URL}/resumes/download`;
    
    window.open(resumeUrl, "_blank"); // Resume indirme işlemi direkt tarayıcıda yeni bir sekmede açılacak

  };