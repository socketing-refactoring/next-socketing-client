import axios from "axios";
import { ApiResponse } from "../types/api/common";
import { Member } from "../types/api/member";
import { API_SERVER_URL } from "../constants/server";
import { toast } from "react-toastify";

export const MEMBER_SERVER_URL = API_SERVER_URL + "/api/v1/members";

export const fetchMemberInfo = async (
  memberId: string
): Promise<ApiResponse<Member>> => {
  const response = await axios.get<ApiResponse<Member>>(
    `${MEMBER_SERVER_URL}/${memberId}`
  );
  return response.data;
};

export const updateMemberNickname = async (
  memberId: string,
  newNickname: string
): Promise<ApiResponse<Member>> => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    toast.error("인증 토큰이 없습니다.");
    return;
  }

  const response = await axios.patch<ApiResponse<Member>>(
    `${MEMBER_SERVER_URL}/${memberId}/nickname`,
    newNickname,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
