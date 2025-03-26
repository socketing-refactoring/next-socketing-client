import { useRouter } from "next/navigation";
import useReservationStore from "../../store/reservation/useReservationStore";
import useMemberStore from "../../store/member/useMemberStore";
import Button from "../common/Button";

const ReservationCreationBox = (eventData: DetailedEvent) => {
  const router = useRouter();

  const {
    selectedSeats,
    areasMap,
    currentAreaId,
    eventId,
    eventDatetimeId,
    setCurrentTempOrder,
  } = useReservationStore();

  const { memberId } = useMemberStore();

  const handleReservationSubmit = () => {
    const newTempOrder: NewTempOrder = {
      eventDatetimeId: eventDatetimeId,
      eventDatetime: eventData.eventDatetimes.filter(
        (eventDatetime) => eventDatetime.id === eventDatetimeId
      )[0].datetime,
      eventTitle: eventData.title,
      seats: Array.from(selectedSeats).map(
        ({
          reservationId,
          reserverId,
          reserverName,
          reserverEmail,
          ...seatWithoutReservation
        }) => seatWithoutReservation
      ),
    };

    setCurrentTempOrder(newTempOrder);
    router.push(`/order`);

    //toast.error("예매에 실패하셨습니다. 다시 시도해주세요.");
  };

  return (
    <div className="my-2">
      <Button
        onClick={() => void handleReservationSubmit()}
        className="p-4 w-full transition-colors flex items-center justify-between"
        variant="primary"
      >
        <span>선택 좌석 예매하기</span>
        <div className="size-6 text-sm rounded-full flex items-center justify-center text-black bg-gray-300">
          {selectedSeats.size}
        </div>
      </Button>
    </div>
  );
};

export default ReservationCreationBox;
