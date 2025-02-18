import axios from "axios";
import { API_SERVER_URL } from "../constants/server";
import { ApiResponse } from "../types/api/common";
import { Order } from "../types/api/order";

export const ORDER_SERVER_URL = API_SERVER_URL + "/api/v1/orders";

export const fetchAllOrdersByMemberId = async (
  memberId: string
): Promise<ApiResponse<Order[]>> => {
  console.log("fetch", memberId);
  const response = await axios.get<ApiResponse<Order[]>>(ORDER_SERVER_URL, {
    params: { memberId },
  });
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
