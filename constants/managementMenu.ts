import { MenuLabelType } from "../types/page/management";

export const MANAGEMENT_MENU: {
  [key: string]: { label: string; url: string };
} = {
  // ongoing: { label: "진행 중인 공연", url: "/management/event/ongoing" },
  // past: { label: "마감된 공연", url: "/management/event/past" },
  registerEvent: { label: "공연 등록하기", url: "/management/event/register" },
  // profile: { label: "내 프로필", url: "/management/profile" },
};

export const MANAGEMENT_CATEGORY: {
  [key: string]: { label: string; menus: MenuLabelType[] };
} = {
  myEvent: { label: "My Event", menus: ["registerEvent"] },
  // myEvent: { label: "My Event", menus: ["ongoing", "past", "registerEvent"] },
  // myProfile: { label: "My profile", menus: ["profile"] },
};
