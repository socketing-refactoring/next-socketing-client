import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { managerLogout } from "../api/managerAuthApi";

export const useManagerLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: managerLogout,
    onSuccess: () => {
      toast.success("로그아웃 되었습니다.");
      router.push("/management/login");
    },
    onError: (error) => {
      toast.error("로그아웃에 실패했습니다.");
      console.error(error);
    },
  });
};
