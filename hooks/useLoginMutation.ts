import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { AuthTokenData } from "../types/api/member";
import { ApiErrorResponse, ApiResponse } from "../types/api/common";
import { login } from "../api/authApi";
import { decodeMemberIdFromToken } from "../utils/auth/token";
import { fetchMemberInfo } from "../api/memberApi";
import { useAuth } from "./useAuth";
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  const { initializeAuth, resetAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data: ApiResponse<AuthTokenData>) => {
      const token = data?.data?.accessToken;
      if (!token) {
        toast.error("토큰 정보가 없습니다.");
        resetAuth();
        return;
      }

      const memberId = decodeMemberIdFromToken(token);
      try {
        const response = await fetchMemberInfo(memberId);
        const member = response?.data;
        initializeAuth(token, member);
        toast.success("로그인되었습니다.");
        toast.success(`${member.name} 님, 안녕하세요.`);
      } catch (error) {
        resetAuth();
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message ||
            "사용자 정보를 불러오는 데 실패했습니다.";
          console.error("사용자 정보 불러오기 실패:", errorMessage);
          toast.error(errorMessage);
        } else {
          console.error("예상치 못한 오류 발생:", error);
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data.message || "로그인에 실패했습니다.");
    },
  });
};

export default useLoginMutation;
