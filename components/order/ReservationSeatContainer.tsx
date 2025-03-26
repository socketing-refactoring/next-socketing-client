import { DetailedEvent } from "../../types/api/event";
import SeatContainer from "./SeatContainer";

const ReservationSeatContainer = (eventData: DetailedEvent) => {
  return <SeatContainer {...eventData} />;
};

export default ReservationSeatContainer;
