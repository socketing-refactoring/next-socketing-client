import { ApiResponse } from "../types/api/common";
import { fetchOneEvent } from "../api/eventApi";
import { Event } from "../types/api/event";
import { useQuery } from '@tanstack/react-query';

export const useEvents = (eventId?: string) => {
  return useQuery<ApiResponse<Event>>({
    queryKey: ["one-event", eventId],
    queryFn: async ({ queryKey }) => {
      const [, eventId] = queryKey;
      return fetchOneEvent(eventId as string);
    },
    enabled: !!eventId,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export default useEvents;
