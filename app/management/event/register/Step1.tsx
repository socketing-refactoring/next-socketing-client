import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Step1Form } from "../../../../types/page/management";
import useManagementEventStepStore from "../../../../store/management/useManagementEventStepStore";

const Step1 = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { currentStep, step1Data, setStep1Data } =
    useManagementEventStepStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    trigger,
  } = useForm<Step1Form>({ mode: "onBlur" });

  useEffect(() => {
    if (step1Data && currentStep === 1) {
      setValue("title", step1Data.title || "");
      setValue("description", step1Data.description || "");
      setValue("place", step1Data.place || "");
      setValue("artist", step1Data.artist || "");
      setPreview(
        step1Data.thumbnail ? URL.createObjectURL(step1Data.thumbnail) : null
      ); // 포스터 미리보기 이미지
      trigger();
    }
  }, [step1Data, currentStep]);

  const onSubmit = (data: Step1Form) => {
    if (isValid) {
      setStep1Data(data);
      onNext();
    }
  };

  const handlePrev = () => {
    const data = getValues();
    setStep1Data(data);
    onPrev();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(URL.createObjectURL(file));
      setPreview(URL.createObjectURL(file));
      setValue("thumbnail", file, { shouldValidate: true }); // 유효성 검사 트리거
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue("thumbnail", null, { shouldValidate: true }); // 유효성 검사 트리거
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-96 rounded-md bg-gray-100 p-6">
        <div className="flex space-x-8">
          <div className="w-1/2 flex-col space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                공연 제목
              </label>
              <input
                {...register("title", {
                  required: "공연 제목을 입력해 주세요.",
                })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.title && (
                <p className="text-rose-400 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium ">공연 설명</label>
              <textarea
                {...register("description", {
                  required: "공연 설명을 입력해 주세요.",
                  maxLength: {
                    value: 100,
                    message: "공연 설명을 100자 이내로 입력해 주세요.",
                  },
                })}
                className="w-full mt-1 p-2 min-h-[100px] resize-none border rounded"
              />
              {errors.description && (
                <p className="m-1 text-rose-400 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">공연 장소</label>
              <input
                {...register("place", {
                  required: "공연 장소를 입력해 주세요.",
                  maxLength: {
                    value: 20,
                    message: "공연 장소를 20자 이내로 입력해 주세요.",
                  },
                })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.place && (
                <p className="m-1 text-rose-400 text-sm">
                  {errors.place.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">공연 아티스트</label>
              <input
                {...register("artist", {
                  required: "공연 아티스트를 입력해 주세요.",
                  maxLength: {
                    value: 20,
                    message: "아티스트를 20자 이내로 입력해 주세요.",
                  },
                })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.artist && (
                <p className="m-1 text-rose-400 text-sm">
                  {errors.artist.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-1/2 flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                공연 포스터
              </label>
              <div className="felx-col">
                <div className="border-2 border-blue-200 bg-blue-100 w-full max-h-[400px] p-2 mb-4 flex items-center justify-center rounded-lg overflow-x-auto relative">
                  {/* 이미지 업로드 버튼 (프리뷰가 없을 때만 표시) */}
                  {!preview && (
                    <div className="flex w-full h-100 items-center justify-center rounded-lg relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        onChange={handleImageChange}
                      />
                      <span className="text-gray-500">이미지 업로드</span>
                    </div>
                  )}

                  {/* 프리뷰 이미지 */}
                  {preview && (
                    <div className="flex items-center justify-center relative">
                      <img
                        src={preview}
                        alt="포스터 미리보기"
                        className="object-contain rounded-lg h-full"
                      />
                    </div>
                  )}
                </div>

                {/* 오류 메시지 */}
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm">
                    {errors.thumbnail.message}
                  </p>
                )}

                {/* 이미지 변경 및 삭제 버튼 */}
                {preview && (
                  <div className="flex justify-center  item-center gap-2 mt-2">
                    <label className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer">
                      이미지 변경
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      업로드 취소
                    </button>
                  </div>
                )}
              </div>
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

export default Step1;
