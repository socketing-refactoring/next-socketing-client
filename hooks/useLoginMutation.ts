import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { AuthTokenData, LoginData } from "../types/api/member";
import { ApiErrorResponse, ApiResponse } from "../types/api/common";
import useMemberStore from "../store/member/useMemberStore";
import { jwtDecode } from "jwt-decode";
import { useMember } from "./useMember";
import { useRouter } from "next/navigation";
import { AUTH_SERVER_URL } from "../api/authApi";

export const useLoginMutation = () => {
  const router = useRouter();
  const { saveMemberInfo } = useMember();
  const { setMemberId, setIsLogin } = useMemberStore();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axios.post(`${AUTH_SERVER_URL}/login`, data);
      return response.data;
    },
    onSuccess: (data: ApiResponse<AuthTokenData>) => {
      router.push("/");
      setIsLogin(true);
      toast.success("로그인되었습니다.");

      const token = data?.data?.accessToken;
      if (token) {
        localStorage.setItem("authToken", token);

        const decodedToken = jwtDecode<{ sub: string }>(token);
        const decodedUserId = decodedToken.sub;
        if (decodedUserId) {
          localStorage.setItem("memberId", decodedUserId);
          setMemberId(decodedUserId);
          saveMemberInfo(decodedUserId);
        } else {
          toast.error("토큰 오류가 발생했습니다.");
        }
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data.message || "로그인에 실패했습니다.");
    },
  });
};

export default useLoginMutation;
