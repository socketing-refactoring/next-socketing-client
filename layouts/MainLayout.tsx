"use client";

import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";
import {
  getAuthInfoFromLocalStorage,
  isTokenExpired,
} from "../utils/auth/token";
import { toast } from "react-toastify";
import useMemberStore from "../store/member/useMemberStore";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ManagementHeader from '../components/common/ManagementHeader';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const { member, setMember, setIsLogin } = useMemberStore();
  const { resetAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isManagement = pathname.startsWith("/management");


  const checkLoginStatus = () => {
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

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* 관리 페이지일 때와 아닐 때 헤더를 구분 */}
      {isManagement ? <ManagementHeader /> : <Header />}
      {children}
    </QueryClientProvider>
  );
}
