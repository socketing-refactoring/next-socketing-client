import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { createEvent } from "../api/eventApi";

export const useEventCreateMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("모든 정보가 성공적으로 제출되었습니다!");
      router.push("/management/event");
    },
    onError: (error: AxiosError<ApiError>) => {
      const errorMessage =
        error?.response?.data?.message || "정보 제출 중 오류가 발생했습니다.";
      toast.error(errorMessage);
    },
  });
};
