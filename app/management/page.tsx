import { redirect } from "next/navigation";
import { menuConfig } from "../../types/page/management";

export default function ManagementPage() {
  redirect(Object.values(menuConfig)[0].url);
}
