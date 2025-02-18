import {
  MANAGEMENT_CATEGORY,
  MANAGEMENT_MENU,
} from "../../constants/managementMenu";

export type MenuType = keyof typeof MANAGEMENT_MENU;
export type MenuLabelType = (typeof MANAGEMENT_MENU)[MenuType]["label"];
export type UrlLabelType = (typeof MANAGEMENT_MENU)[MenuType]["url"];

export type CategoryType = keyof typeof MANAGEMENT_CATEGORY;
export type CategoryLabelType =
  (typeof MANAGEMENT_CATEGORY)[CategoryType]["label"];

export interface Step {
  no: number;
  label: string;
}

export interface Step1Form {
  title?: string;
  description?: string;
  place?: string;
  artist?: string;
  thumbnail?: File;
}

export interface Step2Form {
  eventDatetimes?: { value: string }[];
  eventOpenTime?: string;
  ticketingOpenTime?: string;
}

export interface Step3Form {
  totalMap: string | null;
  areas: Array<{
    price: number;
    label: string;
    areaMap: string | null;
    seats: Array<{
      cx: number;
      cy: number;
      row: number;
      number: number;
    }>;
  }>;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Contour {
  id: number;
  type: "contour" | "seat" | "area" | "polygon";
  label?: string;
  path: string;
  center: { x: number; y: number };
  boundingBox: { x: number; y: number; width: number; height: number };
  points: Array<{ x: number; y: number }>;
  cx?: number;
  cy?: number;
  r?: number;
  area_id?: number;
  row?: number;
  number?: number;
  price?: number;
}

export interface Point {
  x: number;
  y: number;
}
