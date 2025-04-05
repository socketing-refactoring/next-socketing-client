import React from "react";
import { formatToKoreanDateAndTime } from "../../utils/event/dateUtils";
import { EventDatetime } from "../../types/api/event";

interface DateProps {
  dateData: EventDatetime[];
}

const ReservationCalendarSideBar: React.FC<DateProps> = ({ dateData }) => {
  return (
    <div className="h-full flex justify-center overflow-y-auto">
      <div className="space-y-3">
        <h2 className="text-lg text-center font-bold mb-2">공연 일정</h2>
        {dateData.map((dateData, index) => (
          <button
            key={index}
            className="w-full md:w-[150px] p-3 text-sm bg-white font-bold shadow rounded-lg text-center border"
          >
            {formatToKoreanDateAndTime(dateData.datetime)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReservationCalendarSideBar;
