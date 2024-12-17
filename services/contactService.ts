import { BASE_URL } from "@/config/config";


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
  
  async createContact(contactData: CreateContactRequest): Promise<void> {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error("Failed to send the contact message.");
    }
  }
}