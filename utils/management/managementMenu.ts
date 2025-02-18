import {
  MANAGEMENT_CATEGORY,
  MANAGEMENT_MENU,
} from "../../constants/managementMenu";
import { CategoryLabelType, MenuType } from "../../types/page/management";

export const getCategoryLabelByMenuType = (
  menu: MenuType
): CategoryLabelType | undefined => {
  const category = Object.values(MANAGEMENT_CATEGORY).find((category) =>
    category.menus.some((menuItem) => String(menuItem) === String(menu))
  );

  return category?.label;
};

export const getMenuLabelByMenuType = (menu: MenuType): string | undefined => {
  return MANAGEMENT_MENU[menu]?.label;
};

export const findMatchingMenuByUrl = (
  currentUrl: string
): MenuType | undefined => {
  return Object.keys(MANAGEMENT_MENU).find((key) =>
    currentUrl.includes(MANAGEMENT_MENU[key as MenuType].url)
  ) as MenuType | undefined;
};

export const getMenuUrl = (menu: MenuType): string => {
  return MANAGEMENT_MENU[menu].url;
};
