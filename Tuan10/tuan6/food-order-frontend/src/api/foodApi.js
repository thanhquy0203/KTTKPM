import axiosClient from "./axiosClient";

const BASE_URL = process.env.REACT_APP_FOOD_SERVICE_URL || "http://localhost:8082";

export const getFoods = () => axiosClient.get(`${BASE_URL}/foods`);
export const addFood = (food) => axiosClient.post(`${BASE_URL}/foods`, food);

export const updateFood = (id, food) =>
  axiosClient.put(`${BASE_URL}/foods/${id}`, food);

export const deleteFood = (id) =>
  axiosClient.delete(`${BASE_URL}/foods/${id}`);