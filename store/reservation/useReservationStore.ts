import create from "zustand";
import {
  AreaReservationStat,
  AreaWithSeatCount,
  SeatWithAreaWithReservation,
} from "../../types/api/event";
import { EventBase } from "../../types/api/event";
import { NewTempOrder } from "../../types/api/order";
import { MAX_TICKET } from "../../constants/ticketing";

interface ReservationState {
  event: EventBase;
  eventId: string | null;
  eventDatetimeId: string | null;
  seatsMap: Map<string, SeatWithAreaWithReservation>;
  areasMap: Map<string, AreaWithSeatCount>;
  currentAreaId: string | null;
  areaStat: AreaReservationStat[];
  selectedSeats: Set<SeatWithAreaWithReservation>;
  currentTempOrder: NewTempOrder | null;
  setEvent: (event: EventBase) => void;
  setEventId: (id: string) => void;
  setEventDatetimeId: (id: string) => void;
  setCurrentAreaId: (id: string) => void;
  setAreaStat: (areaStats: AreaReservationStat[]) => void;
  setSeatsMap: (seatsMap: Map<string, SeatWithAreaWithReservation>) => void;
  setAreasMap: (areasMap: Map<string, AreaWithSeatCount>) => void;
  setSelectedSeats: (seat: SeatWithAreaWithReservation) => void;
  setCurrentTempOrder: (currentOrder: NewTempOrder) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  event: null,
  eventId: null,
  eventDatetimeId: null,
  seatsMap: new Map(),
  areasMap: new Map(),
  currentAreaId: null,
  areaStat: [],
  selectedSeats: new Set<SeatWithAreaWithReservation>(),
  currentTempOrder: null,
  setEvent: (event) => set({ event }),
  setEventId: (eventId) => set({ eventId }),
  setEventDatetimeId: (eventDatetimeId) => set({ eventDatetimeId }),
  setCurrentAreaId: (currentAreaId) => set({ currentAreaId }),
  setAreaStat: (areaStat) => set({ areaStat }),
  setSeatsMap: (seatsMap: Map<string, SeatWithAreaWithReservation>) =>
    set((state) => {
      const newMap = new Map(state.seatsMap);

      seatsMap.forEach((value, key) => {
        newMap.set(key, value);
      });

      return { seatsMap: newMap };
    }),
  setAreasMap: (areasMap: Map<string, AreaWithSeatCount>) =>
    set((state) => {
      const newMap = new Map(state.areasMap);

      areasMap.forEach((value, key) => {
        newMap.set(key, value);
      });
      return { areasMap: newMap };
    }),
  setSelectedSeats: (seat) =>
    set((state) => {
      const newSelectedSeats = new Set(state.selectedSeats);

      if (newSelectedSeats.has(seat)) {
        newSelectedSeats.delete(seat);
      } else {
        if (newSelectedSeats.size >= MAX_TICKET) {
          return state;
        }
        newSelectedSeats.add(seat);
      }

      return { selectedSeats: newSelectedSeats };
    }),
  setCurrentTempOrder: (currentTempOrder) => set({ currentTempOrder }),
}));

export default useReservationStore;
