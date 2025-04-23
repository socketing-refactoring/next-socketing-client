"use client";

import { redirect } from "next/navigation";
import { MANAGEMENT_MENU } from "../../constants/managementMenu";
import useManagerStore from "../../store/manager/useManagerStore";

export default function ManagementPage() {
  const { isManagerLogin, manager } = useManagerStore();
  if (isManagerLogin && manager) {
    redirect(Object.values(MANAGEMENT_MENU)[0].url);
  }
}
