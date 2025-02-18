"use client";

// import { useRouter } from "next/navigation";
import useManagementEventStepStore from "../../../../store/management/useManagementEventStepStore";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const EventRegisterPage = () => {
  const { currentStep, setCurrentStep, steps } = useManagementEventStepStore();
  // const router = useRouter();

  function handleNextClick() {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }

    // router.push("");
  }

  function handlePrevClick() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }

    // router.push("");
  }

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm<NewEvent>();

  return (
    <div className="mt-2">
      {currentStep == 1 && (
        <Step1 onNext={handleNextClick} onPrev={handlePrevClick} />
      )}
      {currentStep == 2 && (
        <Step2 onNext={handleNextClick} onPrev={handlePrevClick} />
      )}
      {currentStep == 3 && (
        <Step3 onNext={handleNextClick} onPrev={handlePrevClick} />
      )}
      {currentStep == 4 && <Step4 onPrev={handlePrevClick} />}
    </div>
  );
};

export default EventRegisterPage;
