import { toast } from "react-toastify";
import { updateMemberNickname } from "../api/memberApi";
import { useMutation } from "react-query";

export const useNicknameUpdateMutation = () => {
  return useMutation({
    mutationFn: async ({
      memberId,
      newNickname,
    }: {
      memberId: string;
      newNickname: string;
    }) => {
      return updateMemberNickname(memberId, newNickname);
    },
    onSuccess: () => {
      toast.success("닉네임이 변경되었습니다!");
    },
    onError: () => {
      toast.error("닉네임 변경에 실패했습니다.");
    },
  });
};

export default useNicknameUpdateMutation;
