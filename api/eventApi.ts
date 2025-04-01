import axios from "axios";
import { API_SERVER_URL } from "../constants/server";
import {
  DetailedEvent,
  Event,
  NewEvent,
  SeatWithAreaWithReservation
} from "../types/api/event";
import { ApiResponse } from "../types/api/common";

export const EVENT_SERVER_URL = API_SERVER_URL + "/api/v1/events";
export const EVENT_SERVER_STATIC_PATH = API_SERVER_URL + "/upload";

export const fetchOneEvent = async (
  eventId: string
): Promise<ApiResponse<Event>> => {
  const { data } = await axios.get<ApiResponse<Event>>(
    `${EVENT_SERVER_URL}/${eventId}`
  );
  return data;
};

export const fetchOneEventDetail = async (
  eventId: string
): Promise<ApiResponse<DetailedEvent>> => {
  const { data } = await axios.get<ApiResponse<DetailedEvent>>(
    `${EVENT_SERVER_URL}/${eventId}/detail`
  );
  return data;
};

export const fetchOneEventReservationDetails = async (
  eventId: string,
  eventDatetimeId: string
): Promise<ApiResponse<SeatWithAreaWithReservation[]>> => {
  const { data } = await axios.get<ApiResponse<SeatWithAreaWithReservation[]>>(
    `${EVENT_SERVER_URL}/${eventId}/dates/${eventDatetimeId}/seat-reservation/detail`
  );
  return data;
};

export const fetchAllEvents = async (): Promise<ApiResponse<Event[]>> => {
  const { data } = await axios.get<ApiResponse<Event[]>>(`${EVENT_SERVER_URL}`);
  return data;
};

export const createNewEvent = async ({
  title,
  thumbnail,
  place,
  artist,
  eventDatetimes,
  totalMap,
  ticketingOpenTime,
  areas,
}: NewEvent): Promise<ApiResponse<NewEvent>> => {
  const { data } = await axios.post<ApiResponse<NewEvent>>(
    `${EVENT_SERVER_URL}`,
    {
      title,
      thumbnail,
      place,
      artist,
      eventDatetimes,
      totalMap,
      ticketingOpenTime,
      areas,
    }
  );

  return data;
};
