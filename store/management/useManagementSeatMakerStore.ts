import create from "zustand";
import { Contour } from "../../types/page/management";
import { EventDatetime } from "../../types/api/event";

export interface Event {
  id: string;
  title: string;
  eventDatetimes: EventDatetime[];
  thumbnail: string;
  place: string;
  artist: string;
  totalMap?: string;
  createdAt?: string;
  updatedAt?: string;
  ticketingOpenTime: string;
}

interface ManagementSeatMakerStore {
  event: Event | null;
  setEvent: (event: Event) => void;
  imageData: string;
  setImageData: (url: string) => void;
  contours: Contour[];
  selectedContour: number | null;
  setContours: (update: (contours: Contour[]) => Contour[]) => void;
  setSelectedContour: (id: number | null) => void;
  updateContourType: (id: number, type: "seat" | "area" | "polygon") => void;
  updateContourLabel: (id: number, label: string) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  selectedContours: number[];
  setSelectedContours: (ids: number[]) => void;
  updateMultipleContours: (updates: Partial<Contour>) => void;
  isImageVisible: boolean;
  setIsImageVisible: (visible: boolean) => void;
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  isSeatRegistered: boolean;
  setIsSeatRegistered: (SeatRegistered: boolean) => void;
}

const useManagementSeatMakerStore = create<ManagementSeatMakerStore>((set) => ({
  event: null,
  setEvent: (event) => set({ event }),
  // setSelectedContour(null);
  // setSelectedContours([]); // 공연 등록 전 선택된 구역 및 좌석 초기화
  imageData: "",
  setImageData: (url) => set({ imageData: url }),
  contours: [],

  setContours: (update) =>
    set((state) => ({ contours: update(state.contours) })),

  selectedContour: null,
  setSelectedContour: (id) =>
    set({ selectedContour: id, selectedContours: [] }),

  updateContourType: (id, type) =>
    set((state) => ({
      contours: state.contours.map((contour) =>
        contour.id === id ? { ...contour, type } : contour
      ),
    })),

  updateContourLabel: (id, label) =>
    set((state) => ({
      contours: state.contours.map((contour) =>
        contour.id === id ? { ...contour, label } : contour
      ),
    })),

  editMode: false,
  setEditMode: (mode) => set({ editMode: mode }),

  selectedContours: [],
  setSelectedContours: (ids) =>
    set({ selectedContours: ids, selectedContour: null }),

  updateMultipleContours: (updates) =>
    set((state) => ({
      contours: state.contours.map((contour) =>
        state.selectedContours.includes(contour.id)
          ? { ...contour, ...updates }
          : contour
      ),
    })),

  isImageVisible: true,
  setIsImageVisible: (visible) => set({ isImageVisible: visible }),

  imageUrl: null,
  setImageUrl: (url) => set({ imageUrl: url }),
  isSeatRegistered: false,
  setIsSeatRegistered: (SeatRegistered: boolean) =>
    set({ isSeatRegistered: SeatRegistered }),
}));

export default useManagementSeatMakerStore;
