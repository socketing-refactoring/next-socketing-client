import React, { useRef, useEffect, useState } from "react";
import useManagementSeatMakerStore from "../../../store/management/useManagementSeatMakerStore";
import { Contour, Point } from "../../../types/page/management";
import ContourToSVG from "../../../utils/management/ContourToSVG";
import ImageMinimap from "./ImageMinimap";

interface SeatMakerProps {
  isDateSidebarOpen: boolean;
}

const SeatMaker: React.FC<SeatMakerProps> = ({ isDateSidebarOpen = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const [showLegend, setShowLegend] = useState(false);
  const {
    editMode,
    setEditMode,
    setSelectedContours,
    contours,
    imageUrl,
    setSelectedContour,
  } = useManagementSeatMakerStore();
  const [selectionBox, setSelectionBox] = useState<{
    start: Point;
    end: Point;
  } | null>(null);
  const [showAreas, setShowAreas] = useState<boolean>(true);

  const ZOOM_THRESHOLD = 1.1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setEditMode(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setEditMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setEditMode]);

  const screenToSVGCoords = (clientX: number, clientY: number): Point => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return { x: 0, y: 0 };
    const svg = containerRef.current?.querySelector("svg");

    if (!svg) return { x: 0, y: 0 };
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;

    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    return {
      x: svgPoint.x,
      y: svgPoint.y,
    };
  };

  const isContourInSelectionArea = (
    contour: Contour,
    box: { start: Point; end: Point }
  ): boolean => {
    const rect = {
      left: Math.min(box.start.x, box.end.x),
      right: Math.max(box.start.x, box.end.x),
      top: Math.min(box.start.y, box.end.y),
      bottom: Math.max(box.start.y, box.end.y),
    };

    return (
      contour.center.x >= rect.left &&
      contour.center.x <= rect.right &&
      contour.center.y >= rect.top &&
      contour.center.y <= rect.bottom
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (editMode && selectionBox) {
        const currentPoint = screenToSVGCoords(e.clientX, e.clientY);
        setSelectionBox((prev) => ({
          start: prev!.start,
          end: currentPoint,
        }));

        const selectedSeats = contours
          .filter(
            (contour) =>
              contour.type === "seat" &&
              isContourInSelectionArea(contour, {
                start: selectionBox.start,
                end: currentPoint,
              })
          )
          .map((c) => c.id);

        setSelectedContours(selectedSeats);
      } else if (isDragging && !editMode) {
        const deltaX = e.clientX - startPoint.x;
        const deltaY = e.clientY - startPoint.y;
        setTranslate((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
        setStartPoint({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setSelectionBox(null);
    };

    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      const newScale = Math.min(Math.max(0.5, scale + delta), 3);
      setScale(newScale);
      setShowAreas(newScale <= ZOOM_THRESHOLD);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    containerRef.current?.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [isDragging, startPoint, scale, editMode, selectionBox, contours]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.button === 0) {
      e.preventDefault();

      const target = e.target as Element;
      const isBackgroundClick = target.closest(".background-image") !== null;

      if (isBackgroundClick) {
        setSelectedContour(null);
        setSelectedContours([]);
      }

      if (editMode) {
        const startSVGCoords = screenToSVGCoords(e.clientX, e.clientY);
        setSelectionBox({
          start: startSVGCoords,
          end: startSVGCoords,
        });
      } else {
        setIsDragging(true);
        setStartPoint({
          x: e.clientX,
          y: e.clientY,
        });
      }
    }
  };

  const renderSelectionBox = () => {
    if (!selectionBox) return null;

    const rect = {
      x: Math.min(selectionBox.start.x, selectionBox.end.x),
      y: Math.min(selectionBox.start.y, selectionBox.end.y),
      width: Math.abs(selectionBox.end.x - selectionBox.start.x),
      height: Math.abs(selectionBox.end.y - selectionBox.start.y),
    };

    return (
      <svg>
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill="rgba(0, 0, 255, 0.1)"
          stroke="blue"
          strokeWidth="1"
          className="pointer-events-none"
        />
      </svg>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#f9efef] transition-all duration-300 
                ${isDateSidebarOpen ? "ml-1/5" : ""}`}
      onMouseDown={handleMouseDown}
      style={{ touchAction: "none" }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: "center",
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        {imageUrl ? (
          <ContourToSVG
            imageUrl={imageUrl}
            lowThreshold={30}
            highThreshold={150}
            minContourArea={0}
            selectionBox={selectionBox}
            showAreas={showAreas}
          />
        ) : (
          <div className="text-gray-500 text-center">
            이미지를 업로드해주세요.
          </div>
        )}
      </div>
      {renderSelectionBox()}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setScale(Math.min(scale + 0.2, 3))}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={() => {
            setScale(1);
            setTranslate({ x: 0, y: 0 });
          }}
          className="px-2 py-1 border rounded-lg hover:bg-gray-100 text-sm"
        >
          Reset
        </button>
        <button
          onClick={() => setScale(Math.max(scale - 0.2, 0.5))}
          className="px-3 py-1 border rounded-lg hover:bg-gray-100"
        >
          -
        </button>
      </div>
      <button
        className="absolute top-0 right-0 rounded-md p-2 shadow-lg flex items-center justify-center text-sm border bg-white opacity-70"
        onClick={() => setShowLegend((prev) => !prev)}
      >
        {showLegend ? "▲" : "미니 맵 ▼"}
      </button>

      {showLegend && (
        <div className="absolute top-10 right-0 max-w-[200px] bg-white rounded-lg shadow-lg opacity-80">
          <ImageMinimap></ImageMinimap>
        </div>
      )}
    </div>
  );
};

export default SeatMaker;
