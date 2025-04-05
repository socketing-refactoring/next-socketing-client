import { toast } from "react-toastify";
import useReservationStore from "../../store/reservation/useReservationStore";
import { SeatWithAreaWithReservation } from "../../types/api/event";
import { getHoverClass, getStatusColor } from "../../utils/event/getSeatInfo";
import React, { useMemo } from "react";
import { MAX_TICKET } from "../../constants/ticketing";

interface SeatObjProps {
  seatData: SeatWithAreaWithReservation;
}

const SeatObj = React.memo(({ seatData }: SeatObjProps) => {
  const { selectedSeats, setSelectedSeats } = useReservationStore();

  const seatStatus = useMemo(() => {
    if (seatData.reservationId) {
      console.log(`${seatData.id}는 예약됨`);
      return "reserved";
    }

    if (selectedSeats.has(seatData)) {
      console.log(`${seatData.id}는 선택됨`);
      return "selected";
    }

    return "available";
  }, [selectedSeats, seatData]);

  const statusColor = getStatusColor(seatStatus);
  const hoverClass = getHoverClass(seatStatus);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (seatData.reservationId) return;
    if (selectedSeats.size == MAX_TICKET && !selectedSeats.has(seatData)) {
      toast.error(`최대 ${MAX_TICKET}개의 좌석만 선택할 수 있습니다.`);
      return;
    }
    setSelectedSeats(seatData); // 좌석 선택
  };

  return (
    <g onClick={handleClick} className="seat-group">
      <circle
        r="8"
        fill={statusColor}
        stroke="#1F2937"
        strokeWidth="2"
        className={`seat transition-colors duration-200 hover:opacity-80 cursor-pointer ${hoverClass}`}
      />
    </g>
  );
});

SeatObj.displayName = "SeatObj";
export default SeatObj;
