import axios from "axios";
import { API_ENDPOINTS } from "./endpoints"; // Ensure correct import

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3003", // Use your API base URL
});

// Add request interceptor to include Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized (Token Expired or Invalid) - Logout and redirect to login
      localStorage.removeItem("authToken");
      //  localStorage.removeItem("user");
      //   window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
