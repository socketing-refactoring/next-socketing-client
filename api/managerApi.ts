import axios from "axios";
import { ApiResponse } from "../types/api/common";
import { Manager, NicknameUpdatedManager } from "../types/api/manager";
import { API_SERVER_URL } from "../constants/server";
import { toast } from "react-toastify";

export const MANAGER_SERVER_URL = API_SERVER_URL + "/api/v1/managers";

const api = axios.create({
  baseURL: MANAGER_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    const managerToken = localStorage.getItem("managerToken");

    if (managerToken) {
      config.headers["Authorization"] = `Bearer ${managerToken}`;
    } else {
      toast.error("인증 토큰이 없습니다.");
      return;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchManagerInfo = async (
  managerId: string
): Promise<ApiResponse<Manager>> => {
  const response = await api.get<ApiResponse<Manager>>(
    `${MANAGER_SERVER_URL}/${managerId}`
  );
  return response.data;
};

export const updateManagerNickname = async (
  managerId: string,
  newNickname: string
): Promise<ApiResponse<NicknameUpdatedManager>> => {
  const response = await api.patch<ApiResponse<NicknameUpdatedManager>>(
    `${MANAGER_SERVER_URL}/${managerId}/nickname`,
    { nickname: newNickname }
  );

  return response.data;
};
