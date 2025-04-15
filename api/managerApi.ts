import axios from "axios";
import { ApiResponse } from "../types/api/common";
import { Manager, NicknameUpdatedManager } from "../types/api/manager";
import { API_SERVER_URL } from "../constants/server";
import { toast } from "react-toastify";

export const MEMBER_SERVER_URL = API_SERVER_URL + "/api/v1/managers";

export const fetchManagerInfo = async (
  managerId: string
): Promise<ApiResponse<Manager>> => {
  const response = await axios.get<ApiResponse<Manager>>(
    `${MEMBER_SERVER_URL}/${managerId}`
  );
  return response.data;
};

export const updateManagerNickname = async (
  managerId: string,
  newNickname: string
): Promise<ApiResponse<NicknameUpdatedManager>> => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    toast.error("인증 토큰이 없습니다.");
    return;
  }

  const response = await axios.patch<ApiResponse<NicknameUpdatedManager>>(
    `${MEMBER_SERVER_URL}/${managerId}/nickname`,
    { nickname: newNickname },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
