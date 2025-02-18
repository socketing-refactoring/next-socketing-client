import React from "react";
import EventSeatRegisterConfirmSvgWrapper from "./EventSeatRegisterConfirmSvgWrapper";
import useManagementEventStepStore from "../../../store/management/useManagementEventStepStore";

const EventSeatRegisterConfirmSeatContainer = () => {
  const { step3Data } = useManagementEventStepStore();

  const flatAreas = step3Data?.areas.map(({ price, label, areaMap }) => ({
    price,
    label,
    areaMap,
  }));

  const flatSeats = step3Data.areas.flatMap((area) => area.seats);

  return (
    <div className="relative h-full">
      <EventSeatRegisterConfirmSvgWrapper
        svg={step3Data.totalMap}
        seats={flatSeats}
        areas={flatAreas}
      />
    </div>
  );
};

export default EventSeatRegisterConfirmSeatContainer;
