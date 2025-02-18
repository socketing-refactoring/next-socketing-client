import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Step1Form, Step2Form, Step3Form } from "../types/page/management";
import { ApiError } from "next/dist/server/api-utils";
import { EVENT_SERVER_URL } from "../api/eventApi";

export const useEventCreateMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Step1Form & Step2Form & Step3Form) => {
      const formData = new FormData();

      // Step 1 Data
      formData.append("title", data.title || "");
      formData.append("description", data.description || "");
      formData.append("place", data.place || "");
      formData.append("artist", data.artist || "");
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      // Step 2 Data
      formData.append("eventOpenTime", data.eventOpenTime || "");
      formData.append("ticketingOpenTime", data.ticketingOpenTime || "");
      formData.append(
        "eventDatetimes",
        JSON.stringify(data.eventDatetimes || [])
      );

      // Step 3 Data
      formData.append("totalMap", data.totalMap || "");
      formData.append("areas", JSON.stringify(data.areas || []));

      const response = await axios.post(EVENT_SERVER_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success("모든 정보가 성공적으로 제출되었습니다!");
      router.push("/management/event");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.message || "정보 제출 중 오류가 발생했습니다.";
      toast.error(errorMessage);
    },
  });
};
