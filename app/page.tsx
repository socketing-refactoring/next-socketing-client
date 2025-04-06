"use client";

import { ApiResponse } from "../types/api/common";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { EVENT_SERVER_STATIC_PATH, fetchAllEvents } from "../api/eventApi";
import LoadingPage from "./loading/page";
import ErrorPage from "./error/page";
import { fetchErrorMessages } from "../constants/errorMessages";
import { Event } from "../types/api/event";
import dayjs from "dayjs";
import MainBanner from "../components/main/MainBanner";
import { useRouter } from "next/navigation";
import { formatToKoreanDateAndTime } from "../utils/event/dateUtils";
import TicketButton from "../components/main/TiketButton";
import CardList from "../components/main/CardList";
import Image from "next/image";
import { useQuery } from '@tanstack/react-query';

const UserMainPage = () => {
  const router = useRouter();
  const now = useCurrentTime();

  const useEvents = (id?: string) => {
    return useQuery<ApiResponse<Event[]>>({
      queryKey: id ? ["all-events", id] : ["all-events"],
      queryFn: fetchAllEvents,
    });
  };

  const { data, isLoading, isError } = useEvents();

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage errorMessage={fetchErrorMessages.general} />;
  // if (!data?.data)
  //   return <ErrorPage errorMessage={fetchErrorMessages.noEventData} />;

  const eventData = data.data;

  // 티켓팅 오픈 예정 공연 목록
  const impendingTicketingEvents = eventData
    ?.filter((event) => event.ticketingOpenTime)
    .map((event) => ({
      ...event,
      ticketingOpenTime: dayjs(event.ticketingOpenTime)
        .tz("Asia/Seoul")
        .toISOString(),
    }))
    .filter(
      (event) =>
        dayjs(event.ticketingOpenTime).valueOf() &&
        dayjs(event.ticketingOpenTime).valueOf() >= now
    )
    .sort((a, b) => {
      return (
        dayjs(a.ticketingOpenTime).valueOf() -
        dayjs(b.ticketingOpenTime).valueOf()
      );
    });

  // 예매 진행 중인 공연 목록
  const ongoingTicketingEvents = eventData
    ?.filter((event) => event.ticketingOpenTime)
    .map((event) => ({
      ...event,
      ticketingOpenTime: dayjs(event.ticketingOpenTime)
        .tz("Asia/Seoul")
        .toISOString(),
    }))
    .filter((event) => dayjs(event.ticketingOpenTime).valueOf() < now)
    .sort((a, b) => {
      return (
        dayjs(a.ticketingOpenTime).valueOf() -
        dayjs(b.ticketingOpenTime).valueOf()
      );
    });

  // 필터링된 이벤트를 MainBanner에 전달
  const nextTicketingEvent = eventData
    ?.filter((event) => event.ticketingOpenTime)
    .map((event) => ({
      ...event,
      ticketingOpenTime: dayjs(event.ticketingOpenTime)
        .tz("Asia/Seoul")
        .toISOString(),
    }))
    .filter((event) => {
      // ticketingOpenTime으로부터 5분(300000ms)이 지나지 않은 이벤트만 포함
      return dayjs(event.ticketingOpenTime).valueOf() > now - 21600000;
    })
    .sort(
      (a, b) =>
        dayjs(a.ticketingOpenTime).valueOf() -
        dayjs(b.ticketingOpenTime).valueOf()
    )
    .slice(0, 1);

  return (
    <>
      <MainBanner event={nextTicketingEvent ? nextTicketingEvent[0] : null} />

      <div className="px-6 md:px-20 pt-8 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            티켓팅 오픈 예정 공연
          </h2>
          <div className="flex flex-col gap-4">
            {impendingTicketingEvents && impendingTicketingEvents.length > 0 ? (
              impendingTicketingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white flex flex-col md:flex-row items-center justify-between px-8 py-6 rounded-xl border border-gray-200 shadow-sm 
                    hover:shadow-md  
                    active:bg-gray-100 
                    transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/event/${event.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      router.push(`/event/${event.id}`);
                    }
                  }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="h-48 md:w-24 md:h-32 flex-shrink-0">
                      <Image
                        src={`${EVENT_SERVER_STATIC_PATH}/${event.thumbnail}`}
                        alt={event.title}
                        className="w-full h-full object-contain rounded-lg shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-16 font-semibold">
                            티켓 오픈
                          </span>
                          <span>
                            {formatToKoreanDateAndTime(event.ticketingOpenTime)}
                          </span>
                        </p>
                        {/* <p className="flex items-center gap-2">
                          <span className="inline-block w-16 font-semibold">
                            공연 일자
                          </span>
                          <span>
                            {formatToKoreanDateAndTime(
                              event.eventDates[0].date
                            )}
                          </span>
                        </p> */}
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-16 font-semibold">
                            장소
                          </span>
                          <span>{event.place}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-0 flex-col items-end gap-3">
                    <TicketButton event={event} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">
                  티켓팅 오픈 예정인 공연이 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* 예매 진행 중인 공연 목록 */}
        <div className="max-w-7xl mx-auto mt-14">
          <h2 className="text-2xl font-bold text-center mb-6">
            예매 진행 중인 공연
          </h2>
          {ongoingTicketingEvents && ongoingTicketingEvents.length > 0 ? (
            <CardList events={ongoingTicketingEvents} />
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 text-lg">
                예매 진행 중인 공연이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMainPage;
