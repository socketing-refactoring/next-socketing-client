import { fetchOneEventReservationDetails } from "../api/eventApi";
import { useQuery } from "@tanstack/react-query";

export const useEventSeatReservation = (
  queryEventId: string,
  queryEventDatetimeId: string
) => {
  return useQuery({
    queryKey: ["one-event-reservations", queryEventDatetimeId],
    queryFn: async ({ queryKey }) => {
      const [, queryEventDatetimeId] = queryKey;
      return fetchOneEventReservationDetails(
        queryEventId,
        queryEventDatetimeId
      );
    },
    enabled: !!queryEventDatetimeId,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export default useEventSeatReservation;
