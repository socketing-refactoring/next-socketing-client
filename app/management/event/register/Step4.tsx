import EventDatetimeSidebar from "../../../../components/management/Step4Components/EventDatetimeSidebar";
import EventSeatAreaInfo from "../../../../components/management/Step4Components/EventSeatAreaInfo";
import EventSeatRegisterConfirmLayout from "../../../../components/management/Step4Components/EventSeatRegisterConfirmLayout";
import EventSeatRegisterConfirmSeatContainer from "../../../../components/management/Step4Components/EventSeatRegisterConfirmSeatContainer";
import TopContent from "../../../../components/management/Step4Components/TopContent";
import { useEventCreateMutation } from "../../../../hooks/useEventCreateMutation";
import useManagementEventStepStore from "../../../../store/management/useManagementEventStepStore";
import { convertToCreateEventRequestDTO } from "../../../../utils/management/ConvertData";

const Step4 = ({ onPrev }: { onPrev: () => void }) => {
  const { currentStep, steps } = useManagementEventStepStore();
  const { step1Data, step2Data, step3Data } = useManagementEventStepStore();
  const eventCreateMutation = useEventCreateMutation();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault(); // 새로고침 방지

    const requestData = convertToCreateEventRequestDTO(
      step1Data,
      step2Data,
      step3Data
    );

    eventCreateMutation.mutate(requestData);
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <>
      <EventSeatRegisterConfirmLayout
        topContent={<TopContent />}
        centerContent={<EventSeatRegisterConfirmSeatContainer />}
        rightTopContent={<EventDatetimeSidebar />}
        rightBottomContent={<EventSeatAreaInfo />}
      />

      <form onSubmit={handleRegister}>
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
            type="submit"
            className={`px-4 py-2 rounded-lg text-white transitio
        ${currentStep === steps.length ? "bg-green-500" : "bg-green-500 opacity-50 cursor-not-allowed"}
        `}
            disabled={currentStep != steps.length}
          >
            최종 등록
          </button>
        </div>
      </form>
    </>
  );
};

export default Step4;
