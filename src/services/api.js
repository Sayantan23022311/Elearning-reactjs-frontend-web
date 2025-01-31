// src/services/api.js
import axios from "axios";
import { API_ENDPOINTS } from "../services/endpoints";
// API call functions

// Auth API call for login
export const login = async (loginData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.login, loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
