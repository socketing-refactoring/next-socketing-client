import { updateMemberNickname } from '../api/memberApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { ApiErrorResponse, ApiResponse } from '../types/api/common';
import { AxiosError } from 'axios';
import { NicknameUpdatedMember } from '../types/api/member';

export const useNicknameUpdateMutation = () => {

  return useMutation({
    mutationFn: ({
      memberId,
      newNickname,
    }: {
      memberId: string;
      newNickname: string;
    }) => updateMemberNickname(memberId, newNickname),
    onSuccess: (data: ApiResponse<NicknameUpdatedMember>) => {
      toast.success(`닉네임이 ${data?.data.nickname}으로 변경되었습니다!`);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error?.response?.data?.message || "닉네임 변경에 실패했습니다.");
    },
  });
};
