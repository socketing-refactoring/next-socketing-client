"use client";

import useManagementEventStepStore from "../../store/management/useManagementEventStepStore";

export type ProgressStep = {
  id: number;
  label: string;
  completed: boolean;
  active: boolean;
};

const ProgressNav = () => {
  const { steps, currentStep, setCurrentStep } = useManagementEventStepStore();

  const widthBetweenSteps = Math.floor(20 / 3);

  return (
    <div className="w-full relative">
      {/* Progress bar */}
      <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
        {currentStep == 1 && (
          <div
            className="absolute h-full bg-blue-500 transition-all duration-300"
            style={{ width: "10%" }}
          />
        )}

        {currentStep > 1 && currentStep <= steps.length && (
          <>
            <div
              className="absolute h-full bg-green-500 transition-all duration-300"
              style={{
                left: 0,
                width: `${(currentStep - 1) * (20 + widthBetweenSteps) + 10}%`,
              }}
            />
          </>
        )}
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-1/5">
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white
                  ${
                    step.no < currentStep
                      ? "border-green-500"
                      : step.no == currentStep
                        ? "border-blue-500"
                        : "border-gray-300"
                  }`}
            >
              <span
                className={`{"text-sm font-medium" ${
                  step.no < currentStep
                    ? "text-green-500"
                    : step.no == currentStep
                      ? "text-blue-500"
                      : "text-gray-500"
                }`}
              >
                {step.no}
              </span>
            </div>

            {/* Label */}
            <span
              className={`mt-2 text-sm font-medium
                ${
                  step.no < currentStep
                    ? "text-green-500"
                    : step.no == currentStep
                      ? "text-blue-500"
                      : "text-gray-500"
                }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressNav;
