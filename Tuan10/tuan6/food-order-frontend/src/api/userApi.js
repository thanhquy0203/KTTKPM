import axiosClient from "./axiosClient";

const BASE_URL = process.env.REACT_APP_USER_SERVICE_URL || "http://localhost:8081";

export const register = (data) => axiosClient.post(`${BASE_URL}/register`, data);
export const login = (data) => axiosClient.post(`${BASE_URL}/login`, data);