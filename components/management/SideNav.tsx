import { useRouter } from "next/navigation";
import { useManagementMenuStore } from "../../store/management/useManagementMenuStore";
import { getMenuUrl } from "../../utils/management/managementMenu";
import {
  MANAGEMENT_CATEGORY,
  MANAGEMENT_MENU,
} from "../../constants/managementMenu";
import { MenuType } from '../../types/page/management';

const SideNav = () => {
  const { activeMenu, setActiveMenu } = useManagementMenuStore();
  const router = useRouter();

  const handleMenuChange = (menu: MenuType) => {
    setActiveMenu(menu);
    router.push(getMenuUrl(menu));
  };

  return (
    <aside className="hidden lg:flex flex-col px-10 min-h-screen w-56 bg-white shadow-xl text-black">
      <div className="h-10"></div>
      <nav className="space-y-8 text-gray-500">
        {Object.entries(MANAGEMENT_CATEGORY).map(
          ([categoryKey, { label, menus }]) => (
            <div key={categoryKey}>
              <p className="text-gray-600 font-bold text-md uppercase mb-3">
                {label}
              </p>
              <ul className="space-y-3">
                {menus.map((menu) => (
                  <li
                    key={menu}
                    className={`cursor-pointer ${
                      activeMenu === menu ? "text-rose-400 font-bold" : ""
                    } hover:text-rose-500`}
                    onClick={() => handleMenuChange(menu)}
                  >
                    {MANAGEMENT_MENU[menu as MenuType].label}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </nav>
    </aside>
  );
};

export default SideNav;
