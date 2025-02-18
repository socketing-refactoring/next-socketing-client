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

export const updateUserNickname = async (
  memberId: string,
  newNickname: string
): Promise<ApiResponse<Member>> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("인증 토큰이 없습니다. 로그인해 주세요.");
    }
    const response = await axios.patch<ApiResponse<Member>>(
      `${MEMBER_SERVER_URL}/${memberId}/nickname`,
      { nickname: newNickname },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("닉네임 변경에 실패했습니다.");
    console.error("Failed to update nickname:", error);
    throw error;
  }
};
