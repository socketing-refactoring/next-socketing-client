import { useRouter } from "next/navigation";
import useReservationStore from "../../store/reservation/useReservationStore";
import useMemberStore from "../../store/member/useMemberStore";
import Button from "../common/Button";
import { NewTempOrder } from '../../types/api/order';
import { toast } from 'react-toastify';
import { MAX_TICKET } from '../../constants/ticketing';
import { DetailedEvent } from '../../types/api/event';

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
    if (selectedSeats.size < 1) {
      toast.error("좌석을 1석 이상 선택해 주세요.");
    }

    if (selectedSeats.size >= MAX_TICKET) {
      toast.error(`좌석을 ${MAX_TICKET} 석 이하로 선택해 주세요.`);
    }
    
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
  };

  return (
    <div className="my-2">
      <Button
        onClick={() => void handleReservationSubmit()}
        className="p-4 w-full transition-colors flex items-center justify-between"
        variant="primary"
        disabled={selectedSeats.size < 1 || selectedSeats.size > MAX_TICKET}
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
