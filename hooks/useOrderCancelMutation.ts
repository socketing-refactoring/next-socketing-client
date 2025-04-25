import { useMutation } from "@tanstack/react-query";
import { cancelOrder } from "../api/orderApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const useOrderCancelMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (id: string) => {
      return await cancelOrder(id);
    },
    onSuccess: () => {
      toast.success("주문이 취소되었습니다..");
      router.push("/mypage");
    },
    onError: (error) => {
      toast.error("주문 취소에 실패하였습니다.");
      console.error(error);
    },
  });
};
