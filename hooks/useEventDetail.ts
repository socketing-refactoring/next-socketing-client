import { useQuery } from '@tanstack/react-query';
import { fetchOneEventDetail } from "../api/eventApi";
import { ApiErrorResponse, ApiResponse } from "../types/api/common";
import { DetailedEvent } from "../types/api/event";
import { AxiosError } from 'axios';

export const useEventDetail = (queryEventId: string) => {
  return useQuery<ApiResponse<DetailedEvent>, AxiosError<ApiErrorResponse>, ApiResponse<DetailedEvent>, [string, string]>({
    queryKey: ["one-event-detail", queryEventId],
    queryFn: async ({ queryKey }) => {
      const [, urlEventId] = queryKey;
      return fetchOneEventDetail(urlEventId);
    },
    enabled: !!queryEventId,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    // cacheTime: 1000 * 60 * 10,
  });
};

export default useEventDetail;
