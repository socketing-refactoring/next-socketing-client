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
import { useQuery } from "react-query";
import { ApiResponse } from "../../../types/api/common";
import { Event } from "../../../types/api/event";
import { fetchOneEvent } from "../../../api/eventApi";
import { useParams } from "next/navigation";

const EventDetailPage = () => {
  const { setEvent, setFilteredEvent } = useEventDetailStore();
  const { eventId } = useParams();

  const useEvents = (eventId?: string) => {
    return useQuery<ApiResponse<Event>>(
      ["one-event", eventId],
      async ({ queryKey }) => {
        const [, eventId] = queryKey;
        return fetchOneEvent(eventId as string);
      }
    );
  };
  const { data, isLoading, isError } = useEvents(eventId as string);

  useEffect(() => {
    if (data?.data) {
      const eventData = data.data;
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
