import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Step2Form } from "../../../../types/page/management";
import useManagementEventStepStore from "../../../../store/management/useManagementEventStepStore";
import { getCurrentDateTime } from "../../../../utils/event/dateUtils";
import Button from "../../../../components/common/Button";

const Step2 = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { currentStep, step2Data, setStep2Data } =
    useManagementEventStepStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    trigger,
    control,
  } = useForm<Step2Form>({ mode: "onBlur" });

  const { fields, append, remove } = useFieldArray<Step2Form>({
    control,
    name: "eventDatetimes",
  });

  useEffect(() => {
    if (step2Data && currentStep === 2) {
      setValue("eventDatetimes", step2Data.eventDatetimes || []);
      setValue("ticketingOpenTime", step2Data.ticketingOpenTime || "");
      setValue("eventOpenTime", step2Data.eventOpenTime || "");
      trigger();
    }
  }, [step2Data, currentStep, setValue, trigger]);

  const onSubmit = (data: Step2Form) => {
    if (isValid) {
      setStep2Data(data);
      onNext();
    }
  };

  const handlePrev = () => {
    const data = getValues();
    setStep2Data(data);
    onPrev();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-96 rounded-md bg-gray-100 p-6">
        <div className="flex space-x-8">
          <div className="w-1/2 flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium ">공연 일정</label>
              {fields.map((item, index) => (
                <div key={item.id} className="flex space-x-2 items-center">
                  <input
                    defaultValue={getCurrentDateTime()}
                    type="datetime-local"
                    {...register(`eventDatetimes.${index}`, {
                      required: "공연 일정을 입력해 주세요.",
                    })}
                    className="w-full mt-1 p-2 border rounded"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    type="button"
                    onClick={() => remove(index)}
                    className="my-1"
                  >
                    ❌
                  </Button>
                </div>
              ))}
              {errors.eventDatetimes && (
                <p className="m-1 text-rose-400 text-sm">
                  {errors.eventDatetimes?.[0]?.message}
                </p>
              )}
              <Button
                type="button"
                onClick={() => append({ value: "" })}
                className="mt-2 bg-green-500 text-white p-2 rounded"
              >
                일정 추가
              </Button>
            </div>
          </div>
          <div className="w-1/2 flex-col space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                공연 오픈
              </label>
              <input
                defaultValue={getCurrentDateTime()}
                type="datetime-local"
                {...register("eventOpenTime", {
                  required: "공연 오픈 일정을 입력해 주세요.",
                })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.eventOpenTime && (
                <p className="text-rose-400 text-sm">
                  {errors.eventOpenTime.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium ">티켓팅 오픈</label>
              <input
                defaultValue={getCurrentDateTime()}
                type="datetime-local"
                {...register("ticketingOpenTime", {
                  required: "티켓팅 오픈 일정을 입력해 주세요.",
                })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.ticketingOpenTime && (
                <p className="m-1 text-rose-400 text-sm">
                  {errors.ticketingOpenTime.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 이전, 다음 버튼 */}
      <div className="mt-8 flex gap-4 justify-center">
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
          className={`px-4 py-2 rounded-lg text-white transition 
            ${isValid ? "bg-blue-500" : "bg-blue-500 opacity-50 cursor-not-allowed"}`}
          disabled={!isValid}
        >
          다음
        </button>
      </div>
    </form>
  );
};

export default Step2;
