import React from "react";
import { getStatusColor } from "../../utils/event/getSeatInfo";

interface SeatProps {
  reserved: boolean;
}

const MySeatObj: React.FC<SeatProps> = ({ reserved }) => {
  const statusColor = getStatusColor(reserved ? "selected" : "available");

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
