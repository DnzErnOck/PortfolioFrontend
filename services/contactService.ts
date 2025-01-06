import { API, BASE_API } from "@/config/axiosInstances";

export interface CreateContactRequest {
  name: string;
  surname: string;
  mailAddress: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  surname: string;
  mailAddress: string;
  message: string;
}

export const ContactService = {
  /**
   * Create a new contact (requires authorization)
   */
  async createContact(contactData: CreateContactRequest): Promise<void> {
    try {
      await API.post("/contacts", contactData);
    } catch (error) {
      console.error("Contact oluşturulurken hata oluştu:", error);
      throw new Error("Failed to send the contact message.");
    }
  },

  /**
   * Get contact details by ID (requires authorization)
   */
  async getContactById(contactId: number): Promise<ContactResponse> {
    try {
      const response = await API.get<ContactResponse>(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error("Contact bilgisi alınırken hata oluştu:", error);
      throw new Error("Failed to fetch the contact information.");
    }
  },

  /**
   * Get all contacts (does not require authorization)
   */
  async getAllContacts(): Promise<ContactResponse[]> {
    try {
      const response = await BASE_API.get<ContactResponse[]>("/contacts");
      return response.data;
    } catch (error) {
      console.error("Contact listesi alınırken hata oluştu:", error);
      throw new Error("Failed to fetch the contact list.");
    }
  },

  /**
   * Delete a contact by ID (requires authorization)
   */
  async deleteContact(contactId: number): Promise<void> {
    try {
      await API.delete(`/contacts/${contactId}`);
    } catch (error) {
      console.error("Contact silinirken hata oluştu:", error);
      throw new Error("Failed to delete the contact.");
    }
  },
};
