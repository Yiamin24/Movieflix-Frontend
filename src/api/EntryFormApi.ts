import axios from "axios";
import { getAuthHeaders } from "./AuthToken";

/* -------------------------------------------------------------------------- */
/* ✅ API Base URL Setup                                                      */
/* -------------------------------------------------------------------------- */

let API_BASE_URL = "http://localhost:4000/api";

if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
} else if (typeof process !== "undefined" && process.env?.REACT_APP_API_BASE_URL) {
  API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

const ENTRIES_URL = `${API_BASE_URL}/entries`;

/* -------------------------------------------------------------------------- */
/* ✅ Create Entry                                                            */
/* -------------------------------------------------------------------------- */

export const createEntry = async (entryData: Record<string, any>, posterFile?: File | null) => {
  try {
    const formData = new FormData();
    // ✅ Store JSON safely in form-data
    formData.append("data", JSON.stringify(entryData));
    if (posterFile) formData.append("poster", posterFile);

    const response = await axios.post(ENTRIES_URL, formData, {
      headers: {
        ...getAuthHeaders(true).headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ Error creating entry:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to create entry." };
  }
};

/* -------------------------------------------------------------------------- */
/* ✅ Update Entry                                                            */
/* -------------------------------------------------------------------------- */

export const updateEntry = async (
  id: string | number,
  entryData: Record<string, any>,
  posterFile?: File | null
) => {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(entryData));
    if (posterFile) formData.append("poster", posterFile);

    const response = await axios.put(`${ENTRIES_URL}/${id}`, formData, {
      headers: {
        ...getAuthHeaders(true).headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ Error updating entry:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to update entry." };
  }
};

/* -------------------------------------------------------------------------- */
/* ✅ Optional: Fetch + Delete helpers (Recommended for full CRUD)            */
/* -------------------------------------------------------------------------- */

export const getEntries = async () => {
  try {
    const response = await axios.get(ENTRIES_URL, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching entries:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch entries." };
  }
};

export const deleteEntry = async (id: string | number) => {
  try {
    const response = await axios.delete(`${ENTRIES_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    console.error("❌ Error deleting entry:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to delete entry." };
  }
};
