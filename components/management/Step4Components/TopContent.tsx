import useManagementEventStepStore from "../../../store/management/useManagementEventStepStore";

const TopContent = () => {
  const { step1Data } = useManagementEventStepStore();
  const posterPreview = step1Data.thumbnail
    ? URL.createObjectURL(step1Data.thumbnail)
    : null;

  return (
    <>
      {/* 배경 이미지 */}
      <div
        id="background-image"
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${posterPreview})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.5",
        }}
      />

      {/* 이벤트 정보 */}
      <div className="relative w-full h-full px-5 md:px-28 py-3 flex items-center bg-gray-100/50">
        <div
          id="poster-container"
          className="w-0 md:w-24 h-full flex-shrink-0 flex justify-center"
        >
          <img
            src={posterPreview}
            alt="공연 포스터"
            className="h-full object-contain  rounded-lg"
          />
        </div>
        <div
          id="event-title-container"
          className="flex flex-col flex-grow h-full p-4 justify-center items-start"
        >
          <div className="flex flex-row items-end mb-1 md:mb-2 gap-2">
            <h1 className="text-lg md:text-2xl font-bold">{step1Data.title}</h1>
          </div>
          <div className="flex flex-row items-end mb-1 md:mb-2 gap-2">
            <h1 className="text-sm md:text-balance font-bold">
              {step1Data.description}
            </h1>
          </div>
          <div className="space-y-1 text-gray-700">
            <div className="flex flex-col md:flex-row gap-1 md:gap-5">
              <div className="flex gap-2">
                <p className="text-sm md:text-base font-bold">장소</p>
                <p className="text-sm md:text-base">{step1Data.place}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-sm md:text-base font-bold">출연</p>
                <p className="text-sm md:text-base">{step1Data.artist}</p>
              </div>
              {/* <p>{String(step1Data.ageLimit)}세 이상</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopContent;
