import create from "zustand";
import { Manager } from "../../types/api/manager";

interface ManagerState {
  manager: Manager | null;
  setManager: (manager: Manager) => void;
  resetManager: () => void;
  isManagerLogin: boolean;
  setIsManagerLogin: (isLogin: boolean) => void;
  isManagerMobileMenuOpen: boolean;
  setIsManagerMobileMenuOpen: (isManagerMobileMenuOpen: boolean) => void;
}

const useManagerStore = create<ManagerState>((set) => ({
  manager: null,
  setManager: (manager) => set({ manager }),
  resetManager: () => set({ manager: null }),
  isManagerLogin: false,
  setIsManagerLogin: (isManagerLogin) =>
    set({ isManagerLogin: isManagerLogin, isManagerMobileMenuOpen: false }),
  isManagerMobileMenuOpen: false,
  setIsManagerMobileMenuOpen: (isManagerMobileMenuOpen) =>
    set({ isManagerMobileMenuOpen: isManagerMobileMenuOpen }),
}));

export default useManagerStore;
