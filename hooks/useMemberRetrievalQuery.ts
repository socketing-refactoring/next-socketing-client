import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { fetchMemberInfo } from "../api/memberApi";
import useMemberStore from "../store/member/useMemberStore";
import { ApiResponse } from "../types/api/common";
import { Member } from "../types/api/member";

export const useMemberRetrievalQuery = (memberId: string) => {
  const { setMember } = useMemberStore();

  return useQuery<ApiResponse<Member>>({
    queryKey: ["member", memberId],
    queryFn: () => fetchMemberInfo(memberId),
    onSuccess: (data) => {
      const member = data?.data;
      if (!member) {
        toast.error("응답에서 사용자 정보를 찾을 수 없습니다.");
        return;
      }

      setMember(member);
    },
    onError: (error: unknown) => {
      console.error("사용자 정보 불러오기 실패:", error);
      toast.error("사용자 정보를 불러오는 데 실패했습니다.");
    },
  });
};

export default useMemberRetrievalQuery;
