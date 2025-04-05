"use client";

import dayjs from "dayjs";
import { useEffect } from "react";
import { useEventDetailStore } from "../../../store/event/useEventDetailStore";
import { fetchErrorMessages } from "../../../constants/errorMessages";
import LoadingPage from "../../loading/page";
import ErrorPage from "../../error/page";
import EventDetailTemplate from "../../../components/event/EventDetailTemplate";
import EventDetailHeader from "../../../components/event/EventDetailHeader";
import EventDetailScheduleTab from "../../../components/event/EventDetailScheduleTab";
import EventDetailAboutTab from "../../../components/event/EventDetailAboutTab";
import useEvents from "../../../hooks/useEvents";
import { useParams } from "next/navigation";

const EventDetailPage = () => {
  const { setEvent, setFilteredEvent, setSelectedDates } =
    useEventDetailStore();
  const { eventId } = useParams();
  const { data, isLoading, isError } = useEvents(eventId as string);

  useEffect(() => {
    setSelectedDates([]);
    setFilteredEvent(null);
    setEvent(null);
  }, [setSelectedDates, setFilteredEvent, setEvent]);

  useEffect(() => {
    if (data) {
      const eventData = data?.data;
      setEvent(eventData);

      const filteredEvent = {
        ...eventData,
        eventDates:
          eventData.eventDatetimes?.filter((eventDate) =>
            eventData.eventDatetimes?.some(
              (date) =>
                dayjs(eventDate.datetime).tz("Asia/Seoul").valueOf() ===
                dayjs(date.datetime).tz("Asia/Seoul").valueOf()
            )
          ) || [],
      };

      setFilteredEvent(filteredEvent);
    }
  }, [data, setEvent, setFilteredEvent]);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage errorMessage={fetchErrorMessages.general} />;
  if (!data?.data)
    return <ErrorPage errorMessage={fetchErrorMessages.noEventData} />;

  return (
    <EventDetailTemplate
      eventDetailHeader={<EventDetailHeader />}
      eventDetailScheduleTab={<EventDetailScheduleTab />}
      eventDetailAboutTab={<EventDetailAboutTab />}
    />
  );
};

export default EventDetailPage;
