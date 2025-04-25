import React from "react";
import { Area, Seat } from "../../types/api/event";
import MySeatObj from "./MySeatObj";
import MySvgWrapper from "./MySvgWrapper";

interface SeatContainerProps {
  svg: string;
  areas: Area[];
  selectedSeatIds: string[] | undefined;
}

const MySeatContainer: React.FC<SeatContainerProps> = ({
  svg,
  areas,
  selectedSeatIds,
}) => {
  const renderSeat = (seatData: Seat) => {
    return <MySeatObj reserved={selectedSeatIds?.includes(seatData.id)} />;
  };

  return (
    <div className="relative h-full">
      <MySvgWrapper
        renderSeat={renderSeat}
        svg={svg}
        seats={areas.flatMap((area) => area.seats)}
        areas={areas}
      />
    </div>
  );
};

export default MySeatContainer;
