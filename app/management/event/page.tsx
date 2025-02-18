import { redirect } from "next/navigation";
import {
  MANAGEMENT_CATEGORY,
  MANAGEMENT_MENU,
} from "../../../constants/managementMenu";

const eventCategoryKey: string = "myEvent";

export default function ManagementPage() {
  redirect(MANAGEMENT_MENU[MANAGEMENT_CATEGORY[eventCategoryKey].menus[0]].url);
}
