import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  formatDateToKoreanDate,
  formatDateToKoreanTime,
} from "../../utils/event/dateUtils";
import Button from "../common/Button";
import useMemberStore from "../../store/member/useMemberStore";
import { useTicketingTime } from "../../hooks/useTicketingtime";

interface ScheduleCardProps {
  eventId: string;
  eventDateId: string;
  date: Date;
  ticketingStartTime?: Date;
}

const ScheduleCard = ({
  eventId,
  eventDateId,
  date,
  ticketingStartTime,
}: ScheduleCardProps) => {
  const router = useRouter();
  const { member } = useMemberStore();
  const { isNowTicketingStarted } = useTicketingTime(ticketingStartTime);

  let isTicketingStarted = false;
  if (
    ticketingStartTime &&
    new Date().valueOf() >= ticketingStartTime.valueOf()
  ) {
    isTicketingStarted = true;
  } else {
    isTicketingStarted = isNowTicketingStarted;
  }

  const isDisabled = !isTicketingStarted;

  const checkLogin = () => {
    if (!member.id) {
      return false;
    }
    return true;
  };

  const handleDefaultReservationClick = () => {
    if (!checkLogin()) {
      toast.success("예약 페이지에 접근하기 위해서는 로그인이 필요합니다.");
      return;
    }

    if (!isTicketingStarted) {
      toast.error("티켓팅이 아직 시작되지 않았습니다.");
      return;
    }
    router.push(`/reservation/${eventId}/${eventDateId}`);
  };

  return (
    <>
      {/* lg */}
      <div className="hidden lg:flex event-card h-20 items-center justify-between p-4 mx-2 mb-2 rounded-lg border shadow-lg hover:bg-gray-100 transition">
        <div className="schedule-info flex gap-2 items-center">
          <div
            id="schedule-date"
            className=" font-semibold text-gray-800 flex items-end"
          >
            <p>{formatDateToKoreanDate(date)}</p>
          </div>
          <div className="schedule-time text-gray-600 flex items-end">
            <p>{formatDateToKoreanTime(date)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={handleDefaultReservationClick}
            disabled={isDisabled}
            className="text-sm"
          >
            {isDisabled ? "일반 준비 중" : "예매하기"}
          </Button>
        </div>
      </div>
      {/* 모바일 반응형, md */}
      <div className="lg:hidden event-card h-20 flex items-center justify-between pl-4 pr-3 md:px-8 py-4 md:mx-2 mb-2 rounded-lg border shadow-sm md:shadow-lg hover:bg-gray-100 transition">
        <div className="schedule-info flex flex-col">
          <div
            id="schedule-date"
            className="text-base md:text-lg font-semibold text-gray-800 flex items-end"
          >
            <p>{formatDateToKoreanDate(date)}</p>
          </div>
          <div className="schedule-time text-sm md:text-base text-gray-600 flex items-end">
            <p>{formatDateToKoreanTime(date)}</p>
          </div>
        </div>
        <div className="flex gap-1 md:gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleDefaultReservationClick}
            disabled={isDisabled}
          >
            {isDisabled ? "준비 중" : "예매"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ScheduleCard;
