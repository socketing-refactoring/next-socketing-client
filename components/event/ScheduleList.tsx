import ScheduleCard from "./ScheduleCard";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Event, EventDatetime } from "../../types/api/event";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ScheduleListProps {
  filteredEvent: Event;
  selectedDates: Date[];
}

const ScheduleList = ({ filteredEvent, selectedDates }: ScheduleListProps) => {
  const filteredSchedules =
    selectedDates.length === 0
      ? [...filteredEvent.eventDatetimes].sort(
          (a, b) =>
            dayjs(a.datetime).tz("Asia/Seoul").valueOf() -
            dayjs(b.datetime).tz("Asia/Seoul").valueOf()
        )
      : filteredEvent.eventDatetimes
          .filter((schedule: EventDatetime) => {
            const scheduleDate = dayjs(schedule.datetime).tz("Asia/Seoul");
            return selectedDates.some((selectedDate) => {
              const selected = dayjs(selectedDate).tz("Asia/Seoul");
              return (
                selected.date() === scheduleDate.date() &&
                selected.month() === scheduleDate.month() &&
                selected.year() === scheduleDate.year()
              );
            });
          })
          .sort(
            (a, b) =>
              dayjs(a.datetime).tz("Asia/Seoul").valueOf() -
              dayjs(b.datetime).tz("Asia/Seoul").valueOf()
          );

  return (
    <div className="schedule-list">
      {filteredSchedules.length > 0 ? (
        filteredSchedules.map((schedule: EventDatetime) => (
          <ScheduleCard
            key={schedule.id}
            eventId={filteredEvent.id}
            eventDateId={schedule.id}
            date={dayjs(schedule.datetime).tz("Asia/Seoul").toDate()}
            ticketingStartTime={dayjs(filteredEvent.ticketingOpenTime)
              .tz("Asia/Seoul")
              .valueOf()}
          />
        ))
      ) : (
        <div>선택된 날짜에 해당하는 공연 일정이 없습니다.</div>
      )}
    </div>
  );
};

export default ScheduleList;
