import { EVENT_SERVER_STATIC_PATH } from "../../api/eventApi";
import { useEventDetailStore } from "../../store/event/useEventDetailStore";
import { formatToKoreanDateAndTime } from "../../utils/event/dateUtils";

const EventDetailAboutTab = () => {
  const { event } = useEventDetailStore();

  if (!event) {
    return null;
  }

  return (
    <>
      <div id="event-content-title" className="tab-content-title-container">
        <h2 className="tab-content-title md:ml-10">공연 소개</h2>
      </div>
      <div
        id="event-about"
        className="content-container md:pl-20 overflow-y-auto"
      >
        <div
          key={event.id}
          className="event-details px-2 md:p-2 flex flex-col md:flex-row justify-start md:gap-10"
        >
          <div className="max-h-96 max-w-96 items-start flex justify-center">
            <img
              src={`${EVENT_SERVER_STATIC_PATH}/${event.thumbnail}`}
              alt={event.title}
              className="h-full object-contain rounded-lg"
            />
          </div>

          <div id="event-detail-about-content" className="my-4 md:my-0">
            <div className="px-1 my-2 text-center md:text-start">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <h3 className="text-lg">{event.description}</h3>
            </div>

            <div className="pl-2 flex flex-col mt-5 gap-1">
              <div className="flex gap-2">
                <p className="text-gray-700 text-lg font-bold w-24">장소</p>
                <p className="text-gray-700 text-lg">{event.place}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-700 text-lg font-bold w-24">출연</p>
                <p className="text-gray-700 text-lg">{event.artist}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-gray-700 text-lg font-bold w-24">
                  공연 일정
                </p>

                <ul className="list-disc pl-6">
                  {event.eventDatetimes.map((schedule) => (
                    <li key={schedule.id} className="text-gray-700 text-lg">
                      {formatToKoreanDateAndTime(schedule.datetime)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailAboutTab;
