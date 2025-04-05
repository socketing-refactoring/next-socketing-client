import { EVENT_SERVER_STATIC_PATH } from "../../api/eventApi";
import { DetailedEvent } from "../../types/api/event";
import { formatToKoreanDateAndTime } from "../../utils/event/dateUtils";

const ReservationUpperEvent = (eventData: DetailedEvent) => {
  return (
    <>
      {/* 배경 이미지 */}
      <div
        id="background-image"
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${EVENT_SERVER_STATIC_PATH}/upload/${eventData.thumbnail})`,
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
            src={`${EVENT_SERVER_STATIC_PATH}/${eventData.thumbnail}`}
            alt="공연 포스터"
            className="h-full object-contain  rounded-lg"
            width="100"
          />
        </div>
        <div
          id="event-title-container"
          className="flex flex-col flex-grow h-full p-4 justify-center items-start"
        >
          <div className="flex flex-row items-end mb-1 md:mb-2 gap-2">
            <h1 className="text-lg md:text-2xl font-bold">{eventData.title}</h1>
          </div>
          <div className="space-y-1 text-gray-700">
            <div className="flex flex-col md:flex-row gap-1 md:gap-5">
              <div className="flex gap-2">
                <p className="text-sm md:text-base font-bold">장소</p>
                <p className="text-sm md:text-base">{eventData.place}</p>
              </div>
              <div className="flex  gap-2">
                <p className="text-sm md:text-base font-bold">시간</p>
                <p className="text-sm md:text-base">
                  {formatToKoreanDateAndTime(
                    eventData.eventDatetimes[0].datetime
                  )}
                  {eventData.eventDatetimes.length > 1 &&
                    ` 외 ${eventData.eventDatetimes.length - 1}회`}{" "}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-sm md:text-base font-bold">출연</p>
                <p className="text-sm md:text-base">{eventData.artist}</p>
              </div>
              {/* <p>{String(eventData.ageLimit)}세 이상</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationUpperEvent;
