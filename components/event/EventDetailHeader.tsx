import { useRouter } from "next/navigation";
import { useEventDetailStore } from "../../store/event/useEventDetailStore";
import { EVENT_SERVER_STATIC_PATH } from "../../api/eventApi";

const EventDetailHeader = () => {
  const router = useRouter();
  const { event } = useEventDetailStore();

  if (!event) {
    return null;
  }

  return (
    <>
      {/* 배경 이미지 */}
      <div
        id="background-image"
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${EVENT_SERVER_STATIC_PATH}/${event.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.5",
        }}
      />
      {/* 이벤트 정보 */}
      <div className="relative w-full h-full px-5 md:px-28 py-3 flex items-center bg-gray-100/50">
        <div id="poster-container" className="poster-box">
          <img
            className="object-contain"
            src={`${EVENT_SERVER_STATIC_PATH}/${event.thumbnail}`}
            alt="event poster image"
          />
        </div>
        <div
          id="event-title-container"
          className="flex flex-col flex-grow h-full p-4 justify-center items-start"
        >
          <h1 className="text-2xl font-bold py-2">{event.title}</h1>
          <p className="pl-1 font-bold text-stone-600">{event.place}</p>
        </div>
      </div>
    </>
  );
};

export default EventDetailHeader;
