"use client";
import { ReactNode, useEffect } from "react";
import SideNav from "../../components/management/SideNav";
import { usePathname } from "next/navigation";
import { useManagementMenuStore } from "../../store/management/useManagementMenuStore";
import {
  findMatchingMenuByUrl,
  getCategoryLabelByMenuType,
  getMenuLabelByMenuType,
} from "../../utils/management/managementMenu";

const ManagementLayout = ({ children }: { children: ReactNode }) => {
  const { activeMenu, setActiveMenu } = useManagementMenuStore();

  const currentUrl = usePathname();

  useEffect(() => {
    const menu = findMatchingMenuByUrl(currentUrl);

    if (menu) {
      setActiveMenu(menu);
    } else {
      console.log("Failed to find matching menu by url");
    }
  }, [currentUrl]);

  return (
    <div className="flex h-full">
      <SideNav />

      <main className="flex-1 p-6">
        {/* BreadCrumb */}
        <div className="flex">
          <p className="font-bold uppercase text-gray-800">
            {getCategoryLabelByMenuType(activeMenu)}
          </p>
          <p className="mx-1">/</p>
          <p>{getMenuLabelByMenuType(activeMenu)}</p>
        </div>
        {/* Content */}
        <div className="flex flex-col min-h-96 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};

export default ManagementLayout;
