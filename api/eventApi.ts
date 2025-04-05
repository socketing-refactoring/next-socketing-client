import axios from "axios";
import { API_SERVER_URL } from "../constants/server";
import {
  DetailedEvent,
  Event,
  NewEvent,
  SeatWithAreaWithReservation,
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

export const createEvent = async (data: NewEvent) => {
  const formData = new FormData();

  // Step 1 Data
  formData.append("title", data.title || "");
  formData.append("description", data.description || "");
  formData.append("place", data.place || "");
  formData.append("artist", data.artist || "");
  if (data.thumbnail) {
    formData.append("thumbnail", data.thumbnail);
  }

  // Step 2 Data
  formData.append("eventOpenTime", data.eventOpenTime || "");
  formData.append("ticketingOpenTime", data.ticketingOpenTime || "");
  formData.append("eventDatetimes", JSON.stringify(data.eventDatetimes || []));

  // Step 3 Data
  formData.append("totalMap", data.totalMap || "");
  formData.append("areas", JSON.stringify(data.areas || []));

  // API 호출
  const response = await axios.post(EVENT_SERVER_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
