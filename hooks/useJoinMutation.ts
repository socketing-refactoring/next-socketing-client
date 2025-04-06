import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AUTH_SERVER_URL } from '../api/authApi';
import { ApiErrorResponse, ApiResponse } from '../types/api/common';
import { Member } from '../types/api/member';

export interface JoinFormData {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export const useJoinMutation = (): UseMutationResult<
  ApiResponse<Member>,
  AxiosError<ApiErrorResponse>,
  JoinFormData
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: JoinFormData) => {
      const response = await axios.post(`${AUTH_SERVER_URL}/join`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("회원가입에 성공했습니다!");
      router.push("/");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "회원가입에 실패했습니다.");
    },
  });
};
