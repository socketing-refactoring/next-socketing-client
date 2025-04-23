import {
  removeManagerAuthInfoInLocalStorage,
  setAuthInfoIntoLocalStorage,
  setManagerAuthInfoIntoLocalStorage,
} from "../utils/auth/token";
import useManagerStore from "../store/manager/useManagerStore";
import { Manager } from "../types/api/manager";

export const useManagerAuth = () => {
  const { setIsManagerLogin, setManager } = useManagerStore();

  const initializeManagerAuth = (authToken: string, manager: Manager) => {
    setIsManagerLogin(true);

    setAuthInfoIntoLocalStorage(authToken, manager);
    setManagerAuthInfoIntoLocalStorage(authToken, manager);
  };

  const resetManagerAuth = () => {
    setIsManagerLogin(false);

    removeManagerAuthInfoInLocalStorage();
    setManager(null);
  };

  return { initializeManagerAuth, resetManagerAuth };
};
