import { SeatWithArea } from "./event";

export interface NewTempOrder {
  eventTitle: string;
  eventDatetimeId: string;
  eventDatetime: string;
  seats: SeatWithArea[];
}

export interface Order {
  id: string;
  orderMember: OrderMember;
  orderEvent: OrderEvent;
  eventDatetimeId: string;
  eventDatetime: string;
  reservations: Reservation[];
  canceledAt: string;
  createdAt: string;
}

export interface OrderMember {
  memberId: string;
  memberName: string;
  memberEmail: string;
}

export interface OrderEvent {
  id: string;
  title: string;
  description: string;
  artist: string;
  place: string;
  thumbnail: string;
}

export interface Reservation {
  id: string;
  seatId: string;
}

export interface flatReservation {
  id;
  string;
  seatId: string;
  reserverId: string;
  reserverName: string;
  reserverEmail: string;
}

export interface NewOrder {

}