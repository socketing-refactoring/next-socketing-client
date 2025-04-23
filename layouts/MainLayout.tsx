"use client";

import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";
import {
  getAuthInfoFromLocalStorage,
  getManagerAuthInfoFromLocalStorage,
  isTokenExpired,
} from "../utils/auth/token";
import { toast } from "react-toastify";
import useMemberStore from "../store/member/useMemberStore";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManagementHeader from "../components/common/ManagementHeader";
import useManagerStore from "../store/manager/useManagerStore";
import { useManagerAuth } from "../hooks/useManagerAuth";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const { member, setMember, setIsLogin } = useMemberStore();
  const { manager, setManager, setIsManagerLogin } = useManagerStore();
  const { resetAuth } = useAuth();
  const { resetManagerAuth } = useManagerAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isManagement = pathname.startsWith("/management");

  const checkUserLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      resetAuth();
      return;
    }

    if (isTokenExpired(token)) {
      resetAuth();
      toast.success("로그아웃되었습니다. 다시 로그인해주세요.");
      router.push("/");
      return;
    }

    if (!member) {
      const storedMember = getAuthInfoFromLocalStorage();
      if (!storedMember) {
        toast.error("로그인을 다시 진행해 주세요.");
        return;
      }

      setIsLogin(true);
      setMember(storedMember);
    }
  };

  const checkManagerLoginStatus = () => {
    // const token = localStorage.getItem("managerToken");
    // if (!token) {
    //   resetManagerAuth();
    //   router.push("/management/login");
    //   return;
    // }

    // if (isTokenExpired(token)) {
    //   resetManagerAuth();
    //   toast.info("관리자 세션이 만료되었습니다. 로그인을 다시 진행해 주세요.");
    //   router.push("/management/login");
    //   return;
    // }

    if (!manager) {
      const storedManager = getManagerAuthInfoFromLocalStorage();
      if (!storedManager) {
        toast.info("로그인을 다시 진행해 주세요.");
        return;
      }

      setIsManagerLogin(true);
      setManager(storedManager);
    }
  };

  useEffect(() => {
    if (isManagement) {
      checkManagerLoginStatus();
    } else {
      checkUserLoginStatus();
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {isManagement ? <ManagementHeader /> : <Header />}
      {children}
    </QueryClientProvider>
  );
}
