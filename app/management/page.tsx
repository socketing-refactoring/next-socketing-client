import { redirect } from "next/navigation";
import { MANAGEMENT_MENU } from "../../constants/managementMenu";

export default function ManagementPage() {
  redirect(Object.values(MANAGEMENT_MENU)[0].url);
}
