import { useState, useEffect } from "react";
import { NewArea, NewSeat } from "../../../types/api/event";
import EventSeatRegisterConfirmSeatObj from "./EventSeatRegisterConfirmSeatObj";

interface EventSeatRegisterConfirmSvgWrapperProps {
  svg: string;
  seats: NewSeat[];
  areas: NewArea[];
}

const EventSeatRegisterConfirmSvgWrapper = ({
  svg,
  seats,
  areas,
}: EventSeatRegisterConfirmSvgWrapperProps) => {
  const [svgContent, setSvgContent] = useState<{
    viewBox: string;
    content: string;
  }>({
    viewBox: "",
    content: "",
  });

  useEffect(() => {
    if (!svg) return;

    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = svg;
      const svgElement = tempDiv.querySelector("svg");

      if (svgElement) {
        setSvgContent({
          viewBox: svgElement.getAttribute("viewBox") || "",
          content: Array.from(svgElement.children)
            .filter((child) => {
              return (
                !(child instanceof Element) ||
                !child.classList.contains("seats")
              );
            })
            .map((child) => child.outerHTML)
            .join(""),
        });
      }
      console.log("svgElement", svgElement);
    } catch (error) {
      console.error("Error parsing SVG string:", error);
    }
  }, [svg]);

  if (!svgContent.viewBox) return null;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={svgContent.viewBox}
      className="w-full h-full"
    >
      {/* Background and other elements */}
      <g dangerouslySetInnerHTML={{ __html: svgContent.content }} />

      <g className="areas">
        {areas?.map((area, index) => (
          <g
            key={index}
            className={`area-${index}`}
            dangerouslySetInnerHTML={{ __html: area.areaMap }}
          />
        ))}
      </g>

      <g className="seats">
        {seats?.map((seat, index) => (
          <g
            key={`seat-${index}`}
            transform={`translate(${seat.cx},${seat.cy})`}
          >
            <EventSeatRegisterConfirmSeatObj />
          </g>
        ))}
      </g>
    </svg>
  );
};

export default EventSeatRegisterConfirmSvgWrapper;
