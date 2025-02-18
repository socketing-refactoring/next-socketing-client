"use client";

import { useState } from "react";
import SeatControlPanel from "../../../../components/management/Step3Components/SeatControlPanel";
import SeatMaker from "../../../../components/management/Step3Components/SeatMaker";
import OverallControlPanel from "../../../../components/management/Step3Components/OverAllPanel";
import EventRegisterForm from "../../../../components/management/Step3Components/EventRegisterForm";
import useManagementEventStepStore from "../../../../store/management/useManagementEventStepStore";
import { Step3Form } from "../../../../types/page/management";
import { useForm } from "react-hook-form";
import useManagementSeatMakerStore from "../../../../store/management/useManagementSeatMakerStore";
import EventSeatRegisterLayout from "../../../../components/management/Step3Components/EventSeatRegisterLayout";
import { toast } from "react-toastify";
import Button from "../../../../components/common/Button";

const Step3 = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);

  const { currentStep, setStep3Data } = useManagementEventStepStore();
  const { contours, isSeatRegistered, setIsSeatRegistered } =
    useManagementSeatMakerStore();
  const { handleSubmit } = useForm<Step3Form>({
    mode: "onBlur",
  });

  const generateSVGData = () => {
    const svgElement = document.querySelector("svg");
    if (!svgElement) return null;

    const clonedSvg = svgElement.cloneNode(true) as SVGElement;
    const removableGroups = clonedSvg.querySelectorAll("g.seats, g.areas");
    removableGroups.forEach((group) => group.remove());

    console.log("Generated SVG:", clonedSvg.outerHTML);

    return { svgString: clonedSvg.outerHTML };
  };

  const handleAreaCreation = () => {
    const areaContours = contours.filter((c) => c.type === "area");

    const newAreas = areaContours.map((contour) => {
      const seats = contours
        .filter((c) => c.type === "seat" && c.area_id === contour.id)
        .map((seat) => ({
          cx: seat.cx!,
          cy: seat.cy!,
          row: seat.row!,
          number: seat.number!,
        }));

      return {
        price: contour.price,
        label: contour.label,
        areaMap: document.querySelector(`g[id="${contour.id}"]`)?.outerHTML,
        seats: seats,
      };
    });

    console.log("New Areas:", newAreas);
    return newAreas;
  };

  const onSubmit = () => {
    const generatedData = generateSVGData();
    if (generatedData) {
      const newAreas = handleAreaCreation();
      const step3Data: Step3Form = {
        totalMap: generatedData.svgString,
        areas: newAreas,
      };
      console.log(step3Data);
      setStep3Data(step3Data);
      setIsSeatRegistered(true);
      toast.success("좌석 등록에 성공했습니다.");
    }
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div>
      <EventSeatRegisterLayout
        topContent={<EventRegisterForm />}
        leftSidebarContent={<SeatControlPanel />}
        centerContent={<SeatMaker isDateSidebarOpen={isLeftSidebarOpen} />}
        rightTopContent={<></>}
        rightBottomContent={<OverallControlPanel />}
        isLeftSidebarOpen={isLeftSidebarOpen}
        toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 p-2 w-full flex justify-center align-center bg-gray-100 rounded-md">
          <div className="flex space-x-2">
            <div className="text-lg font-semibold flex flex-col justify-center">
              좌석 정보를 등록하시겠습니까?
            </div>
            <Button type="submit">좌석 등록</Button>
          </div>
        </div>
      </form>
      <div className="m-8 flex gap-4 justify-center">
        <button
          type="button"
          onClick={handlePrev}
          className={`px-4 py-2  rounded-lg
          ${currentStep > 1 ? "bg-gray-200" : "bg-gray-200 opacity-50 cursor-not-allowed"}
          `}
          disabled={currentStep <= 1}
        >
          이전
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`px-4 py-2 rounded-lg text-white transition 
    ${isSeatRegistered ? "bg-blue-500" : "bg-blue-500 opacity-50 cursor-not-allowed"}`}
          disabled={!isSeatRegistered}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step3;
