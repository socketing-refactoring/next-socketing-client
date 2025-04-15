import { fetchMemberInfo } from "../api/memberApi";
import { useQuery } from "@tanstack/react-query";

export const useMemberRetrievalQuery = (memberId: string) => {
  return useQuery({
    queryKey: ["member", memberId],
    queryFn: () => fetchMemberInfo(memberId),
  });
};

export default useMemberRetrievalQuery;
