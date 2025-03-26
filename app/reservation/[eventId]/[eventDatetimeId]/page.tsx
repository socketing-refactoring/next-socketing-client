import { useParams } from "next/navigation";
import useReservationStore from "../../../../store/reservation/useReservationStore";
import { useEffect } from "react";
import useEventDetail from "../../../../hooks/useEventDetail";
import useEventSeatReservation from "../../../../hooks/useEventReservation";
import { fetchErrorMessages } from "../../../../constants/errorMessages";
import LoadingPage from "../../../loading/page";
import ErrorPage from "../../../error/page";
import ReservationLayout from "../../../../components/order/ReservationLayout";
import ReservationUpperEvent from "../../../../components/order/ReservationUpperEvent";
import ReservationSeatContainer from "../../../../components/order/ReservationSeatContainer";
import ReservationMinimap from "../../../../components/order/ReservationMinimap";
import ReservationSeatInfo from "../../../../components/order/ReservationSeatInfo";
import {
  AreaReservationStat,
  AreaWithSeatCount,
  SeatWithAreaWithReservation,
} from "../../../../types/api/event";

const ReservationPage = () => {
  const { eventId: urlEventId, eventDatetimeId: urlEventDatetimeId } =
    useParams<{ eventId: string; eventDatetimeId: string }>();
  const {
    setEventId,
    setEventDatetimeId,
    setSeatsMap,
    areasMap,
    setAreasMap,
    setAreaStat,
  } = useReservationStore();

  useEffect(() => {
    if (urlEventId) setEventId(urlEventId);
    if (urlEventDatetimeId) setEventDatetimeId(urlEventDatetimeId);
  }, [urlEventId, urlEventDatetimeId, setEventId, setEventDatetimeId]);

  const {
    data: eventResponse,
    isLoading,
    isError,
  } = useEventDetail(urlEventId as string);
  const {
    data: reservationResponse,
    isLoading: reservationLoading,
    isError: reservationError,
  } = useEventSeatReservation(urlEventId, urlEventDatetimeId);
  const eventData = eventResponse?.data;
  const reservationData = reservationResponse?.data;

  useEffect(() => {
    if (eventData) {
      const areasMap: Map<string, AreaWithSeatCount> = eventData.areas.reduce(
        (map, area) => {
          map[area.id] = {
            id: area.id,
            areaMap: area.areaMap,
            label: area.label,
            price: area.price,
            seatCount: area.seats.length,
          };
          return map;
        },
        {} as Map<string, AreaWithSeatCount>
      );

      setAreasMap(areasMap);
    }
  }, [eventData, setAreasMap]);

  useEffect(() => {
    if (reservationData) {
      const seatsMap: Map<string, SeatWithAreaWithReservation> =
        reservationData.reduce(
          (map, seatReservation) => {
            map[seatReservation.id] = reservationData;
            return map;
          },
          {} as Map<string, SeatWithAreaWithReservation>
        );

      setSeatsMap(seatsMap);

      const areaStat: AreaReservationStat[] = Object.keys(areasMap).map(
        (areaId) => {
          const area = areasMap.get(areaId);
          if (!area)
            return { id: areaId, totalSeatCount: 0, reservedSeatCount: 0 };

          const reservedSeatCount = reservationData.filter(
            (reservation) =>
              reservation.areaId === areaId &&
              reservation.reservationId !== null
          ).length;

          return {
            id: areaId,
            totalSeatCount: area.seatCount,
            reservedSeatCount,
          };
        }
      );

      setAreaStat(areaStat);
    }
  }, [reservationData, areasMap, setSeatsMap, setAreaStat]);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage errorMessage={fetchErrorMessages.general} />;
  if (!eventData)
    return <ErrorPage errorMessage={fetchErrorMessages.noEventData} />;
  if (!eventData.totalMap)
    return <ErrorPage errorMessage={fetchErrorMessages.noSvgData} />;

  return (
    <ReservationLayout
      topContent={<ReservationUpperEvent {...eventData} />}
      centerContent={<ReservationSeatContainer {...eventData} />}
      rightTopContent={<ReservationMinimap />}
      rightBottomContent={<ReservationSeatInfo {...eventData} />}
    />
  );
};

export default ReservationPage;
