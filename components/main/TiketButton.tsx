import { useRouter } from "next/navigation";
import { useCurrentTime } from "../../hooks/useCurrentTime";
import { getTimeLeft } from "../../utils/event/countdownTimer";
import { Event } from "../../types/api/event";
import dayjs from "dayjs";

interface TicketButtonProps {
  event: Event;
}

const TicketButton = ({ event }: TicketButtonProps) => {
  const router = useRouter();
  const now = useCurrentTime();

  if (!event) {
    return null;
  }

  const isNotStarted = !event.ticketingOpenTime
    ? true
    : new Date(event.ticketingOpenTime).getTime() > now;

  return (
    <div className="relative group inline-block">
      <button
        className={`$px-10 py-3 font-bold rounded-lg transition-colors ${
          isNotStarted
            ? "bg-gray-200 hover:bg-gray-300"
            : "bg-rose-500 hover:bg-rose-600"
        }`}
        onClick={() => router.push(`/event/${event.id}`)}
        disabled={isNotStarted}
      >
        {isNotStarted ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-normal">
              {getTimeLeft(dayjs(event.ticketingOpenTime).valueOf(), now)}
            </span>
          </div>
        ) : (
          "상세보기"
        )}
      </button>
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 
          bg-rose-500/70 text-white text-sm rounded-lg 
          transition-all duration-200 whitespace-nowrap 
          before:content-[''] before:absolute before:top-full before:left-1/2 
          before:-translate-x-1/2 before:border-4 before:border-transparent 
          before:border-t-rose-500/70
          ${
            isNotStarted
              ? "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              : "hidden"
          }
        `}
      >
        티켓 오픈 준비 중입니다
      </div>
    </div>
  );
};

export default TicketButton;
