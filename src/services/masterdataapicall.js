// src/services/api.js
import apicall from "./index";
import { API_ENDPOINTS } from "../services/endpoints";
// API call functions

// Auth API call for login
export const courseAdd = async (courseseAdd) => {
  try {
    const response = await apicall.post(API_ENDPOINTS.add_category, courseseAdd);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//get
export const fetchCourses = async (payload) => {
  try {
    const response = await apicall.get(API_ENDPOINTS.get_category, {
      params: payload, // 👈 Sending payload as query params
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
