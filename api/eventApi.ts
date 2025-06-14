import axios from "axios";
import { API_SERVER_URL } from "../constants/server";
import {
  DetailedEvent,
  Event,
  NewEvent,
  SeatWithArea,
  SeatWithAreaWithReservation,
} from "../types/api/event";
import { ApiResponse } from "../types/api/common";
import { toast } from "react-toastify";

export const EVENT_SERVER_URL = API_SERVER_URL + "/api/v1/events";
export const EVENT_SERVER_STATIC_PATH = API_SERVER_URL + "/upload";

const apiClient = axios.create({
  baseURL: EVENT_SERVER_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("managerToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    toast.error("로그인이 필요합니다.");
  }

  return config;
});

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

export const fetchAllSeats = async (
  eventId: string
): Promise<ApiResponse<SeatWithArea[]>> => {
  const { data } = await axios.get<ApiResponse<SeatWithArea[]>>(
    `${EVENT_SERVER_URL}/${eventId}/seats`
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

  const requestPayload = {
    title: data.title,
    description: data.description,
    place: data.place,
    artist: data.artist,
    eventOpenTime: data.eventOpenTime,
    ticketingOpenTime: data.ticketingOpenTime,
    eventDatetimes: data.eventDatetimes,
    totalMap: data.totalMap,
    areas: data.areas,
  };

  formData.append(
    "request",
    new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
  );

  if (data.thumbnail) {
    formData.append("thumbnail", data.thumbnail);
  }

  const response = await apiClient.post(EVENT_SERVER_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
