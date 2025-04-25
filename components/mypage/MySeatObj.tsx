import React, { useMemo } from "react";
import { Seat, SeatStatus } from "../../types/api/event";
import { getStatusColor } from "../../utils/event/getSeatInfo";

interface SeatProps {
  reserved: boolean;
}

const MySeatObj: React.FC<SeatProps> = ({ reserved }) => {
  const statusColor = getStatusColor(reserved ? "reserved" : "available");

  return (
    <g className="seat-group">
      <circle
        r="8"
        fill={statusColor}
        stroke="#1F2937"
        strokeWidth="2"
        className={`seat transition-colors duration-200 hover:opacity-80 cursor-pointer`}
      />
    </g>
  );
};

export default MySeatObj;
