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
  seats: NewSeat[];
}

export interface NewSeat {
  cx: number;
  cy: number;
  row: number;
  number: number;
}

/* Interface for Data response */
export interface Event {
  id: string;
  title: string;
  eventDatetimes: EventDatetime[];
  thumbnail: string;
  description: string;
  place: string;
  artist: string;
  ticketingOpenTime: string;
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

export interface DetailedEvent {
  id: string;
  title: string;
  description: string;
  eventDates: EventDatetime[];
  thumbnail: string;
  place: string;
  artist: string;
  ticketingOpenTime: string;
  totalMap: string;
  areas: Area[];
  seats: Seat[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Area {
  id?: string;
  price: number;
  label: string;
  areaMap: string;
}

export interface Seat {
  area_id?: number;
  id?: string;
  cx: number;
  cy: number;
  row: number;
  number: number;
  // area_label;
  // area_price;
}
