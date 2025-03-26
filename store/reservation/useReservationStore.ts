import create from "zustand";
import {
  AreaReservationStat,
  AreaWithSeatCount,
  SeatWithAreaWithReservation,
} from "../../types/api/event";
import { NewTempOrder } from "../../types/api/order";

interface ReservationState {
  eventId: string | null;
  eventDatetimeId: string | null;
  seatsMap: Map<string, SeatWithAreaWithReservation>;
  areasMap: Map<string, AreaWithSeatCount>;
  currentAreaId: string | null;
  areaStat: AreaReservationStat[];
  selectedSeats: SeatWithAreaWithReservation[];
  currentTempOrder: NewTempOrder | null;
  setEventId: (id: string) => void;
  setEventDatetimeId: (id: string) => void;
  setCurrentAreaId: (id: string) => void;
  setAreaStat: (areaStats: AreaReservationStat[]) => void;
  setSeatsMap: (seatsMap: Map<string, SeatWithAreaWithReservation>) => void;
  setAreasMap: (areasMap: Map<string, AreaWithSeatCount>) => void;
  setSelectedSeats: (seats: SeatWithAreaWithReservation[]) => void;
  setCurrentTempOrder: (currentOrder: NewTempOrder) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  eventId: null,
  eventDatetimeId: null,
  seatsMap: new Map(),
  areasMap: new Map(),
  currentAreaId: null,
  areaStat: [],
  selectedSeats: [],
  currentTempOrder: null,
  setEventId: (eventId) => set({ eventId }),
  setEventDatetimeId: (eventDatetimeId) => set({ eventDatetimeId }),
  setCurrentAreaId: (currentAreaId) => set({ currentAreaId }),
  setAreaStat: (areaStat) => set({ areaStat }),
  setSeatsMap: (seatsMap: Map<string, SeatWithAreaWithReservation>) =>
    set((state) => {
      const newMap = new Map(state.seatsMap);

      if (seatsMap.size > 0) {
        const firstKey = seatsMap.keys().next().value;
        const firstValue = seatsMap.values().next().value;
        newMap.set(firstKey, firstValue);
      }
      return { seatsMap: newMap };
    }),
  setAreasMap: (areasMap: Map<string, AreaWithSeatCount>) =>
    set((state) => {
      const newMap = new Map(state.areasMap);

      if (areasMap.size > 0) {
        const firstKey = areasMap.keys().next().value;
        const firstValue = areasMap.values().next().value;
        newMap.set(firstKey, firstValue);
      }

      return { areasMap: newMap };
    }),
  setSelectedSeats: (selectedSeats) => set({ selectedSeats }),
  setCurrentTempOrder: (currentTempOrder) => set({ currentTempOrder }),
}));

export default useReservationStore;
