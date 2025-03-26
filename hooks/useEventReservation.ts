import { useQuery } from "react-query";
import { ApiResponse } from "../types/api/common";
import { SeatWithAreaWithReservation } from "../types/api/event";
import { fetchOneEventReservationDetails } from "../api/eventApi";

export const useEventSeatReservation = (
  queryEventId: string,
  queryEventDatetimeId: string
) => {
  return useQuery<ApiResponse<SeatWithAreaWithReservation[]>>(
    ["one-event-reservations", queryEventDatetimeId],
    async ({ queryKey }) => {
      const [, queryEventDatetimeId] = queryKey;
      return fetchOneEventReservationDetails(
        queryEventId as string,
        queryEventDatetimeId as string
      );
    },
    {
      enabled: !!queryEventDatetimeId,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};

export default useEventSeatReservation;
