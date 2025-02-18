export interface Order {
  id: string;
  memberId: string;
  orderEvent: OrderEvent;
  eventDatetimeId: string;
  eventDatetime: string;
  reservations: Reservation[];
  canceledAt: string;
  createdAt: string;
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
  seatRow: number;
  seatNumber: number;
  areaId: string;
  areaPrice: number;
}
