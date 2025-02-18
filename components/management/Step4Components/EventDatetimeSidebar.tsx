import React from "react";
import useManagementEventStepStore from "../../../store/management/useManagementEventStepStore";
import { formatToKoreanDateAndTime } from "../../../utils/dateUtils";

const EventDatetimeSidebar = () => {
  const { step2Data } = useManagementEventStepStore();

  return (
    <div className="h-full flex flex-col overflow-y-auto space-y-3">
      <div className="flex flex-col justify-center items-center space-y-3">
        <h2 className="text-lg text-center font-bold mb-2">공연 일정</h2>
        {step2Data.eventDatetimes.map((datetime, index) => (
          <div
            key={index}
            className="w-full md:w-[150px] p-3 text-sm bg-white font-bold shadow rounded-lg text-center border"
          >
            {formatToKoreanDateAndTime(datetime)}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg text-center font-bold mb-2">공연 오픈 일정</h2>
        <div className="w-full md:w-[150px] p-3 text-sm bg-white font-bold shadow rounded-lg text-center border">
          {formatToKoreanDateAndTime(step2Data.eventOpenTime)}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg text-center font-bold mb-2">티켓팅 오픈 일정</h2>
        <div className="w-full md:w-[150px] p-3 text-sm bg-white font-bold shadow rounded-lg text-center border">
          {formatToKoreanDateAndTime(step2Data.ticketingOpenTime)}
        </div>
      </div>
    </div>
  );
};

export default EventDatetimeSidebar;
