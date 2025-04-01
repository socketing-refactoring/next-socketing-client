import create from "zustand";

interface MemberStore {
  memberId: string | null;
  setMemberId: (memberId: string | null) => void;
  memberName: string | null;
  setMemberName: (memberName: string) => void;
  memberNickname: string | null;
  setMemberNickname: (memberNickname: string) => void;
  memberEmail: string | null;
  setMemberEmail: (memberEmail: string) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const useMemberStore = create<MemberStore>((set) => ({
  memberId: null,
  setMemberId: (memberId) => set({ memberId: memberId }),
  memberName: null,
  setMemberName: (memberName) => set({ memberName: memberName }),
  memberNickname: null,
  setMemberNickname: (memberNickname) =>
    set({ memberNickname: memberNickname }),
  memberEmail: null,
  setMemberEmail: (memberEmail) => set({memberEmail: memberEmail}),
  isLoginModalOpen: false,
  setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin: isLogin }),
}));

export default useMemberStore;
