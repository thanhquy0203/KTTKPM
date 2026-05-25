import axiosClient from "./axiosClient";

const BASE_URL = process.env.REACT_APP_PAYMENT_SERVICE_URL || "http://localhost:8084";

export const pay = (data) => axiosClient.post(`${BASE_URL}/payments`, data);