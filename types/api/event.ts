/* Interface for Data creation request */
export interface NewEvent {
  title: string;
  thumbnail: File;
  place: string;
  artist: string;
  description: string;
  eventDatetimes: string[];
  eventOpenTime: string;
  ticketingOpenTime: string;
  totalMap: string;
  areas: NewArea[];
}

export interface NewArea {
  price: number;
  label: string;
  areaMap: string;
  seats?: NewSeat[];
}

export interface NewSeat {
  cx: number;
  cy: number;
  row: number;
  number: number;
}

/* Interface for Data response */
export interface EventBase {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  place: string;
  artist: string;
}

export interface Event {
  id: string;
  title: string;
  eventDatetimes: EventDatetime[];
  thumbnail: string;
  description: string;
  place: string;
  artist: string;
  ticketingOpenTime: string;
  eventOpenTime: string;
  totalMap?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventDatetime {
  id: string;
  datetime: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DetailedEvent extends Event {
  totalMap: string;
  areas: Area[];
  seats: Seat[];
}

export interface Area {
  id: string;
  price: number;
  label: string;
  areaMap: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  cx: number;
  cy: number;
  row: number;
  number: number;
  areaId?: string;
}

export interface SeatWithArea extends Seat {
  areaId: string;
  areaLabel: string;
  areaPrice: number;
}

export interface SeatWithAreaWithReservation extends SeatWithArea {
  reservationId: string;
  reserverId: string;
  reserverName: string;
  reserverEmail: string;
}

// export interface SeatReservation {
//   id: string,
//   areaId: string,
//   reservationId: string,
//   reserverId: string,
//   reserverName: string,
//   reserverEmail: string
// }

export interface AreaWithSeatCount {
  id?: string;
  price: number;
  label: string;
  areaMap: string;
  seatCount: number;
}

export interface AreaReservationStat {
  id: string;
  totalSeatCount: number;
  reservedSeatCount: number;
}

export type SeatStatus = "available" | "reserved" | "selected";
// | "temporary_hold";
