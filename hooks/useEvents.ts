import { useQuery } from "react-query";
import { ApiResponse } from "../types/api/common";
import { fetchOneEvent } from "../api/eventApi";
import { Event } from "../types/api/event";

export const useEvents = (eventId?: string) => {
  return useQuery<ApiResponse<Event>>(
    ["one-event", eventId],
    async ({ queryKey }) => {
      const [, eventId] = queryKey;
      return fetchOneEvent(eventId as string);
    },
    {
      enabled: !!eventId,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};

export default useEvents;
