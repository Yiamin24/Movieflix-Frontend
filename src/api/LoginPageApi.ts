import { authAxios } from "./AuthToken";
import { setAuthToken, clearAuthToken } from "./AuthToken";

let BASE_URL = "http://localhost:4000/api"; 

if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) {
  BASE_URL = import.meta.env.VITE_API_BASE_URL;
} else if (
  typeof process !== "undefined" &&
  process.env?.REACT_APP_API_BASE_URL
) {
  BASE_URL = process.env.REACT_APP_API_BASE_URL;
}

const API_BASE_URL = `${BASE_URL}/auth`;


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await authAxios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    console.log("✅ Login API success:", response.data);

    if (response.data?.token) {
      setAuthToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ Login API error:", error.response?.data || error.message);
    throw (
      error.response?.data || {
        message: "Login failed. Please check your credentials.",
      }
    );
  }
};


export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    clearAuthToken();
    localStorage.removeItem("user");

    const response = await authAxios.post(`${API_BASE_URL}/signup`, {
      name,
      email,
      password,
    });
    console.log("✅ Signup API success:", response.data);

    alert(
      "✅ Account created! Please check your email for a verification link before logging in."
    );
    return response.data;
  } catch (error: any) {
    console.error("❌ Signup API error:", error.response?.data || error.message);
    throw (
      error.response?.data || {
        message: "Signup failed. Please try again later.",
      }
    );
  }
};


export const verifyUser = async (token?: string) => {
  try {
    const finalToken =
      token || new URLSearchParams(window.location.search).get("token");
    if (!finalToken) return;

    console.log("🪄 Verifying user with token:", finalToken);

    const response = await authAxios.get(`${API_BASE_URL}/verify`, {
      params: { token: finalToken },
    });

    if (response.data?.success) {
      console.log("✅ Verification success:", response.data);
      clearAuthToken();
      localStorage.clear();

      alert("🎉 Your email has been verified! Please log in to continue.");
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.href = "/login";
    } else {
      alert("⚠️ Verification failed or invalid token.");
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ Verification API error:", error.response?.data || error.message);
    alert("⚠️ Verification failed or token expired.");
    window.history.replaceState({}, document.title, window.location.pathname);
    throw (
      error.response?.data || {
        message: "Verification failed or token expired.",
      }
    );
  }
};


(function autoVerify() {
  const token = new URLSearchParams(window.location.search).get("token");
  if (token) verifyUser(token);
})();
