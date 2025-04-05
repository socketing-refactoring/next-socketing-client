import useMemberStore from "../store/member/useMemberStore";
import {
  setAuthInfoIntoLocalStorage,
  removeAuthInfoInLocalStorage,
} from "../utils/auth/token";
import { Member } from "../types/api/member";

export const useAuth = () => {
  const { setIsLogin, setMember } = useMemberStore();

  const initializeAuth = (authToken: string, member: Member) => {
    setIsLogin(true);

    setAuthInfoIntoLocalStorage(authToken, member);
    setMember(member);
  };

  const resetAuth = () => {
    setIsLogin(false);

    removeAuthInfoInLocalStorage();
    setMember(null);
  };

  return { initializeAuth, resetAuth };
};
