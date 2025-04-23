import axios from "axios";
import { AUTH_SERVER_URL } from "./authApi";
import { LoginData } from "../types/api/member";

export const managerLogin = async (data: LoginData) => {
  const response = await axios.post(`${AUTH_SERVER_URL}/manager/login`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const managerLogout = async () => {
  await axios.post(`${AUTH_SERVER_URL}/manager/logout`, null, {
    withCredentials: true,
  });
};
