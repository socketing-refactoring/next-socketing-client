import create from "zustand";
import { Event } from "../../types/api/event";

interface EventDetailStore {
  filteredEvent: Event | null;
  setFilteredEvent: (event: Event) => void;
  event: Event | null;
  setEvent: (event: Event) => void;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
}

export const useEventDetailStore = create<EventDetailStore>((set) => ({
  filteredEvent: null,
  setFilteredEvent: (event) => set({ filteredEvent: event }),

  event: null,
  setEvent: (event) => set({ event }),

  selectedDates: [],
  setSelectedDates: (dates) => set({ selectedDates: dates }),
}));
