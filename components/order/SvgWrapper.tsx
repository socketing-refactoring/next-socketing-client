import { useState, useEffect, forwardRef } from "react";
import {
  AreaWithSeatCount,
  SeatWithAreaWithReservation,
} from "../../types/api/event";
import useReservationStore from "../../store/reservation/useReservationStore";

interface SvgWrapperProps {
  svgString: string;
  seats: SeatWithAreaWithReservation[];
  areas: AreaWithSeatCount[];
  renderSeat: (seat: SeatWithAreaWithReservation) => React.ReactNode;
  onAreaClick?: (areaId: string) => void;
}

interface ParsedSvgData {
  svgString: string;
}

const SvgWrapper = forwardRef<SVGSVGElement, SvgWrapperProps>(
  ({ svgString, seats, areas, renderSeat, onAreaClick }, ref) => {
    const { currentAreaId, setCurrentAreaId, areaStat } = useReservationStore();

    const [svgContent, setSvgContent] = useState<{
      viewBox: string;
      content: string;
    }>({
      viewBox: "",
      content: "",
    });

    const [hoveredAreaId, setHoveredAreaId] = useState<string | null>(null);

    useEffect(() => {
      if (!svgString) return;

      try {
        // const parsedData = JSON.parse(svgString) as ParsedSvgData;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = svgString;
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
      } catch (error) {
        console.error("Error parsing SVG string:", error);
      }
    }, [svgString]);

    useEffect(() => {
      if (!areaStat) return;

      const interpolateColor = (ratio: number) => {
        if (ratio >= 0 && ratio < 0.25) {
          return "rgba(8, 79, 206, 0.983)";
        } else if (ratio >= 0.25 && ratio < 0.5) {
          return "rgba(66, 125, 224, 0.98)";
        } else if (ratio >= 0.5 && ratio < 0.75) {
          return "rgba(132, 162, 229, 0.991)";
        } else if (ratio >= 0.75 && ratio < 1) {
          return "rgba(157, 170, 206, 0.98)";
        } else {
          return "#808080";
        }
      };

      areaStat.forEach((stat) => {
        const areaElement = document.querySelector(
          `.areas [class='${stat.id}'] .area-data`
        );
        if (areaElement) {
          const ratio = stat.reservedSeatCount / stat.totalSeatCount;
          const color = interpolateColor(ratio);
          (areaElement as SVGPathElement).setAttribute("fill", color);
        }
      });
    }, [areaStat]);

    const handleAreaClick = (area: AreaWithSeatCount) => {
      if (currentAreaId === area.id) {
        return;
      }

      const areaElement = document.querySelector(
        `.areas [class='${area.id}'] .area-data`
      );
      if (areaElement instanceof SVGPathElement && onAreaClick) {
        onAreaClick(area.id);
      }
      setCurrentAreaId(area.id);
    };

    const handleMouseEnter = (areaId: string) => {
      if (currentAreaId !== areaId) {
        setHoveredAreaId(areaId);
      }
    };

    // CSS styles for hover effects
    const getAreaStyles = (areaId: string) => {
      const isHovered = hoveredAreaId === areaId;
      const isSelected = currentAreaId === areaId;

      return {
        cursor: isSelected ? "default" : "pointer",
        transition: "all 0.3s ease",
        filter:
          !isSelected && isHovered
            ? "brightness(1.2) drop-shadow(0 0 3px rgba(0,0,0,0.3))"
            : "none",
        opacity: !isSelected && isHovered ? 0.9 : 1,
        stroke: isSelected ? "#2563eb" : "none",
        strokeWidth: isSelected ? "2" : "0",
      };
    };

    return (
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox={svgContent.viewBox}
        className="w-full h-full"
      >
        <g dangerouslySetInnerHTML={{ __html: svgContent.content }} />

        <g className="areas">
          {areas?.map((area) => (
            <g
              key={area.id}
              className={area.id}
              dangerouslySetInnerHTML={{ __html: area.areaMap }}
              onClick={() => handleAreaClick(area)}
              onMouseEnter={() => handleMouseEnter(area.id)}
              onMouseLeave={() => setHoveredAreaId(null)}
              style={getAreaStyles(area.id)}
            />
          ))}
        </g>

        <g className="seats">
          {seats?.map((seat) => (
            <g key={seat.id} transform={`translate(${seat.cx},${seat.cy})`}>
              {renderSeat(seat)}
            </g>
          ))}
        </g>
      </svg>
    );
  }
);

SvgWrapper.displayName = "SvgWrapper";

export default SvgWrapper;
