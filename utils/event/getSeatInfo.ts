import { SeatStatus } from "../../types/api/event";

export const getStatusColor = (status: SeatStatus) => {
  switch (status) {
    case "available":
      return "#FFFFFF";
    case "reserved":
      return "#9CA3AF";
    case "selected":
      return "#F66687";
    // case "temporary_hold":
    //   return "#FBBF24";
    default:
      return "#9CA3AF";
  }
};

export const getHoverClass = (status: string) => {
  if (status === "available" || status === "selected") {
    return "hover:opacity-80 cursor-pointer";
  }
  return "cursor-not-allowed";
};
