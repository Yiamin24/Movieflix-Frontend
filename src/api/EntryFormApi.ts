import axios from "axios";
import { getAuthHeaders } from "./AuthToken";

let API_BASE_URL = "http://localhost:4000/api";
if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
} else if (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE_URL) {
  API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

const ENTRIES_URL = `${API_BASE_URL}/entries`;

export const createEntry = async (entryData: Record<string, any>, posterFile?: File | null) => {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(entryData));
    if (posterFile) formData.append("poster", posterFile);

    const headers = getAuthHeaders(true).headers || {};
    console.log("📤 [Frontend] Create Entry Request:", {
      url: ENTRIES_URL,
      headers,
      entryData,
      hasPoster: !!posterFile,
    });

    const response = await axios.post(ENTRIES_URL, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ [Frontend] Create Entry Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ [Frontend] Error creating entry:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to create entry." };
  }
};

export const getEntries = async () => {
  try {
    console.log("📤 [Frontend] Fetching entries...");
    const response = await axios.get(ENTRIES_URL, getAuthHeaders());
    console.log("✅ [Frontend] Entries fetched:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ [Frontend] Error fetching entries:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch entries." };
  }
};
