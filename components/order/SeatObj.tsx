import { toast } from "react-toastify";
import useReservationStore from "../../store/reservation/useReservationStore";
import { SeatStatus, SeatWithAreaWithReservation } from "../../types/api/event";
import { getHoverClass, getStatusColor } from "../../utils/getSeatInfo";

const MAX_TICKET = 4;

interface SeatObjProps {
  seatData: SeatWithAreaWithReservation;
}

const SeatObj = ({ seatData }: SeatObjProps) => {
  const { selectedSeats, setSelectedSeats } = useReservationStore();

  function getSeatStatus(seat: SeatWithAreaWithReservation): SeatStatus {
    if (seat.reservationId) return "reserved";
    if (selectedSeats.some((seat) => seat.id === seat.id)) return "selected";
    return "available";
  }

  const seatStatus = getSeatStatus(seatData);
  const statusColor = getStatusColor(seatStatus);
  const hoverClass = getHoverClass(seatStatus);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (seatData.reservationId) return;

    if (selectedSeats.some((seat) => seat.id === seatData.id)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat.id !== seatData.id));
    } else {
      if (selectedSeats.length >= MAX_TICKET) {
        toast.error(`최대 ${MAX_TICKET}개의 좌석만 선택할 수 있습니다.`);
        return;
      }
      setSelectedSeats([...selectedSeats, seatData]);
    }
  };

  return (
    <g onClick={handleClick} className="seat-group">
      {seatStatus === "available" && (
        <circle
          r="8"
          fill="none"
          stroke="#FFF"
          strokeWidth="2"
          strokeDasharray="100"
        ></circle>
      )}

      {seatStatus === "selected" && (
        <circle
          r="10"
          fill="none"
          stroke="#F66687"
          strokeWidth="2"
          className="animate-pulse"
        />
      )}

      {seatStatus === "reserved" && (
        <circle
          r="10"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="2"
          className="animate-pulse"
        />
      )}

      <circle
        r="8"
        fill={statusColor}
        stroke="#1F2937"
        strokeWidth="2"
        className={`seat transition-colors duration-200 ${hoverClass}`}
      />
    </g>
  );
};

export default SeatObj;
