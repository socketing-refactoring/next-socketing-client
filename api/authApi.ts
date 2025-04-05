import axios from "axios";
import { API_SERVER_URL } from "../constants/server";
import { LoginData } from "../types/api/member";

export const AUTH_SERVER_URL = API_SERVER_URL + "/api/v1/auth";

export const login = async (data: LoginData) => {
  const response = await axios.post(`${AUTH_SERVER_URL}/login`, data);
  return response.data;
};
