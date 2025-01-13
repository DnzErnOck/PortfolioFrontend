import { API, BASE_API } from "@/config/axiosInstances";
import { PagedResponse } from "./experienceService";


  export interface CertificateResponse {
    id: number;
    name: string;
    organisationName: string;
    givenDate: string;
    certificateSiteLink: string;
    serialNumber: string;
    imageBase64?: string; // Optional, only if images are returned in Base64 format
    image?: File | null;
  }
  
  
  export const CertificateService = {

    getAll: async (page: number = 0, size: number = 10): Promise<PagedResponse<CertificateResponse>> => {
      try {
        const response = await BASE_API.get<PagedResponse<CertificateResponse>>("/certificates", {
          params: { page, size },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching certificates:", error);
        throw error;
      }
    },
  
   
    create : async (data: {
      name: string;
      organisationName: string;
      givenDate: string;
      certificateSiteLink: string;
      serialNumber: string;
      imageBase64: File | null;
      isGetNewPicture: Boolean;
    }) => {
      try {
        const response = await API.post("/certificates", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      } catch (error) {
        console.error("Error creating certificate:", error);
        throw error;
      }
    },
  

    update : async (data: {
      id: number;
      name: string;
      organisationName: string;
      givenDate: string;
      certificateSiteLink: string;
      serialNumber: string;
      image: File | null;
      isGetNewPicture: Boolean;
    }) => {
      try {
        console.log(data);
        
        const response = await API.put("/certificates", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      } catch (error) {
        console.error("Error updating certificate:", error);
        throw error;
      }
    },
    
  
    getById: async (id: number): Promise<CertificateResponse> => {
      try {
        const response = await API.get<CertificateResponse>(`/certificates/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching certificate by ID:", error);
        throw error;
      }
    },
  
  
    delete: async (id: number): Promise<void> => {
      try {
        await API.delete(`/certificates/${id}`);
      } catch (error) {
        console.error("Error deleting certificate:", error);
        throw error;
      }
    },
  };
  