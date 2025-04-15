import create from "zustand";
import { Manager } from "../../types/api/manager";

interface ManagerState {
  manager: Manager | null;
  setManager: (manager: Manager) => void;
  resetManager: () => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const useManagerStore = create<ManagerState>((set) => ({
  manager: null,
  setManager: (manager) => set({ manager }),
  resetManager: () => set({ manager: null }),
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin: isLogin }),
}));

export default useManagerStore;
