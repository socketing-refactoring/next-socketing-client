import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { NewArea, NewEvent, NewSeat } from "../../types/api/event";
import { Step1Form, Step2Form, Step3Form } from "../../types/page/management";

dayjs.extend(utc);
dayjs.extend(timezone);

export function convertToCreateEventRequestDTO(
  step1: Step1Form,
  step2: Step2Form,
  step3: Step3Form
): NewEvent {
  const areas: NewArea[] = step3.areas.map((area) => ({
    label: area.label,
    price: area.price,
    areaMap: area.areaMap,
    seats: area.seats.map(
      (seat) =>
        ({
          cx: seat.cx,
          cy: seat.cy,
          row: seat.row,
          number: seat.number,
        }) as NewSeat
    ),
  }));

  console.log("확인", step2.eventDatetimes);

  return {
    title: step1.title,
    description: step1.description,
    place: step1.place,
    artist: step1.artist,
    thumbnail: step1.thumbnail,
    eventDatetimes: step2.eventDatetimes.map((dt) =>
      {
        const parsed = dayjs(dt).tz("Asia/Seoul");
        console.log("Before:", dt, "→ After:", parsed.toISOString());
        return parsed.toISOString();
      }
    ),
    eventOpenTime: dayjs(step2.eventOpenTime).tz("Asia/Seoul").toISOString(),
    ticketingOpenTime: dayjs(step2.ticketingOpenTime)
      .tz("Asia/Seoul")
      .toISOString(),
    totalMap: step3.totalMap,
    areas: areas,
  };
}
