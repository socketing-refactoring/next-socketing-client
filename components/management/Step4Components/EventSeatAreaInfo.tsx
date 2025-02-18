import React from "react";
import useManagementEventStepStore from "../../../store/management/useManagementEventStepStore";

const EventSeatAreaInfo = () => {
  const { step3Data } = useManagementEventStepStore();

  return (
    <div className="h-full flex justify-center overflow-y-auto">
      <div className="space-y-3">
        <h2 className="text-lg text-center font-bold mb-2">구역과 좌석 정보</h2>
        {step3Data.areas.map((area, index) => (
          <div
            key={index}
            className="w-full md:w-[150px] p-3 text-sm bg-white font-bold shadow rounded-lg text-center border"
          >
            <div>
              {area.label} 구역 {area.price}원
            </div>
            <div>{area.seats.length} 좌석</div>
          </div>
        ))}
        <div>
          총 {step3Data.areas.length} 개 구역,{" "}
          {step3Data.areas.reduce(
            (total, area) => total + area.seats.length,
            0
          )}{" "}
          좌석
        </div>
      </div>
    </div>
  );
};

export default EventSeatAreaInfo;
