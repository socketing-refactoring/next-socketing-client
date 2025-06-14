import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { fetchManagerInfo } from "../api/managerApi";
import { AuthTokenData } from "../types/api/manager";
import { ApiErrorResponse, ApiResponse } from "../types/api/common";
import { useMutation } from "@tanstack/react-query";
import { decodeManagerIdFromToken } from "../utils/auth/managerToken";
import { managerLogin } from "../api/managerAuthApi";
import { useRouter } from "next/navigation";
import useManagerStore from "../store/manager/useManagerStore";
import {
  removeManagerAuthInfoInLocalStorage,
  setManagerAuthInfoIntoLocalStorage,
} from "../utils/auth/token";

export const useManagerLoginMutation = () => {
  const router = useRouter();
  const { setIsManagerLogin, setManager } = useManagerStore();

  const initializeManagerAuth = (token: string, manager: any) => {
    setIsManagerLogin(true);
    setManagerAuthInfoIntoLocalStorage(token, manager);
    setManager(manager);
  };

  const resetManagerAuth = () => {
    setIsManagerLogin(false);
    removeManagerAuthInfoInLocalStorage();
    setManager(null);
  };

  return useMutation({
    mutationFn: managerLogin,
    onSuccess: async (data: ApiResponse<AuthTokenData>) => {
      const token = data?.data?.accessToken;
      if (!token) {
        toast.error("토큰 정보가 없습니다.");
        resetManagerAuth();
        return;
      }

      const managerId = decodeManagerIdFromToken(token);
      try {
        const response = await fetchManagerInfo(managerId);
        const manager = response?.data;

        initializeManagerAuth(token, manager);
        window.location.href = "/management";
        toast.success("로그인되었습니다.");
        toast.success(`${manager.name} 님, 안녕하세요.`);
      } catch (error) {
        resetManagerAuth();
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

export default useManagerLoginMutation;
