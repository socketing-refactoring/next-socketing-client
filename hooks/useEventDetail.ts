import { useQuery } from "react-query";
import { fetchOneEventDetail } from "../api/eventApi";
import { ApiResponse } from "../types/api/common";
import { DetailedEvent } from "../types/api/event";

export const useEventDetail = (queryEventId: string) => {
  return useQuery<ApiResponse<DetailedEvent>>(
    ["one-event-detail", queryEventId],
    async ({ queryKey }) => {
      const [, urlEventId] = queryKey;
      return fetchOneEventDetail(urlEventId as string);
    },
    {
      enabled: !!queryEventId,
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    }
  );
};

export default useEventDetail;
