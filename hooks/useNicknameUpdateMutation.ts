import { updateMemberNickname } from '../api/memberApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

export const useNicknameUpdateMutation = () => {

  return useMutation({
    mutationFn: ({
      memberId,
      newNickname,
    }: {
      memberId: string;
      newNickname: string;
    }) => updateMemberNickname(memberId, newNickname),
    onSuccess: (data) => {
      toast.success(`닉네임이 ${data?.data.nickname}으로 변경되었습니다!`);
    },
    onError: () => {
      toast.error("닉네임 변경에 실패했습니다.");
    },
  });
};
