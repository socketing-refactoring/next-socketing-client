import axios from "axios";
import { API_SERVER_URL } from "../constants/server";
import { ApiResponse } from "../types/api/common";
import { NewOrder, Order } from "../types/api/order";
import { toast } from "react-toastify";

export const ORDER_SERVER_URL = API_SERVER_URL + "/api/v1/orders";

const apiClient = axios.create({
  baseURL: ORDER_SERVER_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    toast.error("로그인이 필요합니다.");
  }

  return config;
});

export const createOrder = async (
  newOrder: NewOrder
): Promise<ApiResponse<Order>> => {
  const response = await apiClient.post<ApiResponse<Order>>(
    ORDER_SERVER_URL,
    newOrder
  );
  return response.data;
};

export const fetchAllOrdersByMemberId = async (
  memberId: string
): Promise<ApiResponse<Order[]>> => {
  const response = await axios.get<ApiResponse<Order[]>>(
    `${ORDER_SERVER_URL}/detail`,
    {
      params: { memberId },
    }
  );
  return response.data;
};

export const fetchOneOrder = async (
  orderId: string
): Promise<ApiResponse<Order>> => {
  const response = await axios.get<ApiResponse<Order>>(
    `${ORDER_SERVER_URL}/${orderId}`
  );
  return response.data;
};

export const cancelOrder = async (
  orderId: string
): Promise<ApiResponse<null>> => {
  const response = await axios.post<ApiResponse<null>>(
    `ORDER_SERVER_URL/${orderId}/cancel`
  );
  return response.data;
};
