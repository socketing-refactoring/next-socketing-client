import Button from "../common/Button";
import { toast } from "react-toastify";
import useReservationStore from "../../store/reservation/useReservationStore";
import { DetailedEvent } from "../../types/api/event";
import { NewTempOrder } from "../../types/api/order";
import useMemberStore from "../../store/member/useMemberStore";
import { useRouter } from "next/navigation";

const ReservationSeatInfo = (eventData: DetailedEvent) => {
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
      seats: selectedSeats.map(
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
    router.push(`order/event/${eventId}/date/${eventDatetimeId}`);

    //toast.error("예매에 실패하셨습니다. 다시 시도해주세요.");
  };

  return (
    <div>
      {selectedSeats ? (
        <div className="space-y-3">
          {selectedSeats.length > 0 && (
            <>
              <Button
                onClick={() => void handleReservationSubmit()}
                className="p-4 w-full transition-colors flex items-center justify-between"
                variant="primary"
              >
                <span>선택 좌석 예매하기</span>
                <div className="size-6 text-sm rounded-full flex items-center justify-center text-black bg-gray-300">
                  {selectedSeats.length}
                </div>
              </Button>
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="border p-3 text-gray-800 bg-white rounded-lg space-y-2"
                >
                  <p className="font-bold text-gray-700">
                    <span className="text-black">
                      {areasMap?.get(seat.areaId)?.label ?? ""}
                    </span>
                    구역 <span className="text-black">{seat.row}</span>열{" "}
                    <span className="text-black">{seat.number}</span>번{" "}
                  </p>

                  <p>
                    <span className="font-bold">
                      가격: {areasMap?.get(currentAreaId!)?.price ?? ""}원
                    </span>
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          좌석을 선택해주세요
        </div>
      )}
    </div>
  );
};

export default ReservationSeatInfo;
