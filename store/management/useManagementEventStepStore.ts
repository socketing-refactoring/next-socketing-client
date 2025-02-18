import create from "zustand";
import {
  Step,
  Step1Form,
  Step2Form,
  Step3Form,
} from "../../types/page/management";

interface ManagementEventStepStore {
  currentStep?: number;
  setCurrentStep: (nextStep: number) => void;
  steps: Step[];
  step1Data: Step1Form | null;
  step2Data: Step2Form | null;
  step3Data: Step3Form | null;
  setStep1Data: (data: Step1Form) => void;
  setStep2Data: (data: Step2Form) => void;
  setStep3Data: (data: Step3Form) => void;
}

const useManagementEventStepStore = create<ManagementEventStepStore>((set) => ({
  currentStep: 1,
  setCurrentStep: (nextStep: number) => set({ currentStep: nextStep }),
  steps: [
    { no: 1, label: "공연 정보 입력" },
    { no: 2, label: "공연 일정 입력" },
    { no: 3, label: "좌석 등록" },
    { no: 4, label: "최종 확인" },
  ],
  step1Data: null,
  step2Data: null,
  step3Data: null,
  setStep1Data: (data: Step1Form) => set({ step1Data: data }),
  setStep2Data: (data: Step2Form) => set({ step2Data: data }),
  setStep3Data: (data: Step3Form) => set({ step3Data: data }),
}));

export default useManagementEventStepStore;
