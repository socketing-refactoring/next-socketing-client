import dayjs from "dayjs";
import { useEventDetailStore } from "../../store/event/useEventDetailStore";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleList from "./ScheduleList";

const EventDetailScheduleTab = () => {
  const { filteredEvent, selectedDates, setSelectedDates } =
    useEventDetailStore();

  if (!filteredEvent) {
    return null;
  }

  const validDates =
    filteredEvent.eventDatetimes?.map((eventDate) =>
      dayjs(eventDate.datetime).tz("Asia/Seoul").toDate()
    ) || [];

  const onDateSelect = (dates: Date[]) => {
    setSelectedDates(dates);
  };

  return (
    <>
      <div className="tab-content-title-container">
        <h2 className="hidden md:block tab-content-title md:ml-10">
          공연 일정
        </h2>
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row ">
        {/* 모바일 반응형 */}
        <div className="md:hidden w-[100%] flex flex-col gap-2 pb-3 border-gray-200 max-h-64 overflow-y-auto">
          <ScheduleList
            filteredEvent={filteredEvent}
            selectedDates={selectedDates}
          />
        </div>
        {/* 달력 */}
        <div className="calendar mt-1 w-[100%] md:w-[50%]">
          <ScheduleHeader
            validDates={validDates}
            selectedDates={selectedDates}
            onDateSelect={onDateSelect}
          />
        </div>

        {/* 리스트 */}
        {/* md, lg */}
        <div className="hidden md:flex flex-col gap-2 w-[50%] pt-5">
          <ScheduleList
            filteredEvent={filteredEvent}
            selectedDates={selectedDates}
          />
        </div>
      </div>
    </>
  );
};

export default EventDetailScheduleTab;
