import axios from "axios";
import { getAuthHeaders } from "./AuthToken";

let API_BASE_URL = "http://localhost:4000/api"; 
if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
} else if (
  typeof process !== "undefined" &&
  process.env?.REACT_APP_API_BASE_URL
) {
  API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

const ENTRIES_URL = `${API_BASE_URL}/entries`;

export const createEntry = async (entryData: any, posterFile?: File) => {
  try {
    const formData = new FormData();

        formData.append("data", JSON.stringify(entryData));

    if (posterFile) formData.append("poster", posterFile);

    const response = await axios.post(ENTRIES_URL, formData, {
      headers: {
        ...getAuthHeaders(true).headers,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ Error creating entry:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to create entry." };
  }
};

export const updateEntry = async (
  id: string,
  entryData: any,
  posterFile?: File
) => {
  try {
    const formData = new FormData();

    formData.append("data", JSON.stringify(entryData));

    if (posterFile) formData.append("poster", posterFile);

    const response = await axios.put(`${ENTRIES_URL}/${id}`, formData, {
      headers: {
        ...getAuthHeaders(true).headers,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ Error updating entry:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to update entry." };
  }
};
