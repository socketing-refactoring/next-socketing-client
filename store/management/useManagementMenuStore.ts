import create from "zustand";
import { MenuType } from "../../types/page/management";

interface ManagementMenuState {
  activeMenu?: MenuType;
  setActiveMenu: (menu: MenuType) => void;
}

export const useManagementMenuStore = create<ManagementMenuState>((set) => ({
  activeMenu: "ongoing",
  setActiveMenu: (menu) => set({ activeMenu: menu }),
}));
