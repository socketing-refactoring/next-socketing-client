import dayjs from "dayjs";
import { useCurrentTime } from "../../hooks/useCurrentTime";
import { Event } from "../../types/api/event";
import { getTimeLeft } from "../../utils/countdownTimer";
import { EVENT_SERVER_STATIC_PATH } from "../../api/eventApi";
import { formatToKoreanDateAndTime } from "../../utils/dateUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface MainBannerProps {
  event: Event;
}

const MainBanner = ({ event }: MainBannerProps) => {
  const router = useRouter();
  const now = useCurrentTime();

  if (!event) {
    return (
      <>
        <div className="w-full bg-black text-white text-center pb-2 text-3xl">
          <h1 className="text-[24px] font-bold border-t-2 border-b-2 p-1">
            예정된 티켓팅이 없습니다.
          </h1>
        </div>
        <div className="relative w-full h-[24rem] overflow-hidden bg-gray-100 flex items-center justify-center">
          <p className="text-center text-lg text-gray-500">
            티켓팅 예정 이벤트가 없습니다.
          </p>
        </div>
      </>
    );
  }

  const isNotStarted = dayjs(event.ticketingOpenTime).valueOf() > now;
  const timeLeft = getTimeLeft(dayjs(event.ticketingOpenTime).valueOf(), now);

  return (
    <>
      <div className="w-full bg-black text-white text-center pb-2 text-3xl">
        <h1 className="text-[24px] font-bold border-t-2 border-b-2 p-1">
          곧 티켓팅이 시작됩니다!🎉
        </h1>
      </div>
      <div className="relative w-full h-[24rem] overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={`${EVENT_SERVER_STATIC_PATH}/${event.thumbnail}`}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center">
              {event.title}
            </h2>
            <p className="text-lg md:text-2xl font-bold text-white mb-6 text-center">
              티켓 오픈:{" "}
              {event.ticketingOpenTime
                ? formatToKoreanDateAndTime(event.ticketingOpenTime)
                : "정보 없음"}
            </p>
            <button
              className={`text-sm md:text-base font-bold text-white px-4 py-2 rounded ${
                isNotStarted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-rose-500 hover:bg-rose-600"
              }`}
              onClick={() => {
                const memberId = localStorage.getItem("memberId");
                if (memberId) {
                  router.push(`/event/${event.id}`);
                } else {
                  toast.success(
                    "예약 페이지에 접근하기 위해서는 로그인이 필요합니다."
                  );
                }
              }}
              disabled={isNotStarted}
            >
              {isNotStarted ? `남은 시간: ${timeLeft}` : timeLeft}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
