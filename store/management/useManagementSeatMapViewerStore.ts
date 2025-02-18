import create from "zustand";
import { Area, Seat } from "../../types/api/event";

interface ManagementSeatMapViewerStore {
  seatsMap: Map<string, Seat>;
  setSeatsMap: (seatsMap: Map<string, Seat>) => void;
  areasMap: Map<string, Area>;
  currentAreaId: string | null;
  setCurrentAreaId: (areaId: string) => void;
}

const useManagementSeatMapViewerStore = create<ManagementSeatMapViewerStore>(
  (set) => ({
    // seatsMap: new Map(),
    // setSeatsMap: (seatsMap) => set({ seatsMap }),
    // areasMap: new Map(),
    // currentAreaId: ,
    // setCurrentAreaId:,
  })
);

export default useManagementSeatMapViewerStore;
