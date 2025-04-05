import create from "zustand";
import { Member } from "../../types/api/member";

interface MemberState {
  member: Member | null;
  setMember: (member: Member) => void;
  resetMember: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const useMemberStore = create<MemberState>((set) => ({
  member: null,
  setMember: (member) => set({ member }),
  resetMember: () => set({ member: null }),
  isLoginModalOpen: false,
  setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin: isLogin }),
}));

export default useMemberStore;
