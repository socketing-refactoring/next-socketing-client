import { toast } from "react-toastify";
import { fetchMemberInfo } from "../api/memberApi";
import useMemberStore from "../store/member/useMemberStore";

export const useMember = () => {
  const { setMemberName } = useMemberStore();

  const saveMemberInfo = async (memberId: string) => {
    try {
      const data = await fetchMemberInfo(memberId);
      const name = data?.data?.name;
      if (name) {
        localStorage.setItem("memberName", name);
        setMemberName(name);
        toast.success(`${name}님, 안녕하세요!`);
      } else {
        console.error("사용자 정보에 오류가 있습니다.");
      }
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  };

  return { saveMemberInfo };
};
