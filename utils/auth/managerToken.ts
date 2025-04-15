import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";
import { Manager } from '../../types/api/manager';

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) {
      toast.error("토큰 유효시간 조회에 오류가 발생했습니다.");
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
  } catch (error) {
    toast.error("유효하지 않은 토큰입니다.", error);
    return true;
  }
};

export const decodeManagerIdFromToken = (token: string) => {
  try {
    const decodedToken = jwtDecode<{ sub: string }>(token);
    const decodedUserId = decodedToken.sub;

    if (!decodedUserId) {
      toast.error("토큰에서 사용자 정보를 불러오는 데 실패했습니다.");
      return;
    }
    return decodedUserId;
  } catch (error) {
    toast.error("토큰 저장 중 오류가 발생했습니다.:", error);
  }
};

export const getManagerAuthInfoFromLocalStorage = (): Manager => {
  return JSON.parse(localStorage.getItem("manager"));
};

export const setManagerAuthInfoIntoLocalStorage = (
  authToken: string,
  manager: Manager
) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("manager", JSON.stringify(manager));
};

export const removeManagerAuthInfoInLocalStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("manager");
};
