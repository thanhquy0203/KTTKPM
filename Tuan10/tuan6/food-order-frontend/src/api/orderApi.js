import axiosClient from "./axiosClient";

const BASE_URL = process.env.REACT_APP_ORDER_SERVICE_URL || "http://localhost:8083";

export const createOrder = (data) => axiosClient.post(`${BASE_URL}/order`, data);
export const getOrders = () => axiosClient.get(`${BASE_URL}/order`);

export const updateOrderStatus = (id, status) => 
  axiosClient.put(`${BASE_URL}/order/${id}`, { status });