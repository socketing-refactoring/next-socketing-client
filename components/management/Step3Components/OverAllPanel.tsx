import React, { useState } from "react";
import useManagementSeatMakerStore from "../../../store/management/useManagementSeatMakerStore";
import { Contour } from "../../../types/page/management";
import {
  calculateBoundingBox,
  createOutlinePath,
} from "../../../utils/management/svg";
import Button from "../../common/Button";

const OverallControlPanel = () => {
  const {
    editMode,
    setEditMode,
    selectedContours,
    setContours,
    setIsImageVisible,
    contours,
    setSelectedContours,
  } = useManagementSeatMakerStore();
  const [areaLabel, setAreaLabel] = useState<string>("");
  const [areaPrice, setAreaPrice] = useState<number>(50000);

  const createAreaFromSelectedSeats = () => {
    if (!areaLabel || selectedContours.length === 0) return;

    const selectedSeats = contours.filter(
      (contour) =>
        contour.type === "seat" && selectedContours.includes(contour.id)
    );

    if (selectedSeats.length === 0) return;
    const firstSeatRadius = selectedSeats[0].r;

    const newArea: Contour = {
      id: Math.max(...contours.map((c) => c.id)) + 1,
      type: "area",
      points: selectedSeats.flatMap((seat) => seat.points),
      path: createOutlinePath(selectedSeats, 20),
      center: {
        x:
          selectedSeats.reduce((sum, seat) => sum + (seat.cx || 0), 0) /
          selectedSeats.length,
        y:
          selectedSeats.reduce((sum, seat) => sum + (seat.cy || 0), 0) /
          selectedSeats.length,
      },
      boundingBox: calculateBoundingBox(
        selectedSeats.flatMap((seat) => seat.points)
      ),
      label: areaLabel,
      price: areaPrice,
    };

    const updatedSeats: Contour[] = [];
    const sortedByY = [...selectedSeats].sort(
      (a, b) => (a.cy || 0) - (b.cy || 0)
    );

    const rows: Contour[][] = [];
    let currentRow: Contour[] = [];
    let currentY = sortedByY[0]?.cy;

    sortedByY.forEach((seat) => {
      if (currentY === undefined || Math.abs((seat.cy || 0) - currentY) <= 1) {
        currentRow.push(seat);
      } else {
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [seat];
        currentY = seat.cy || 0;
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    rows.forEach((rowSeats, rowIndex) => {
      const sortedSeats = [...rowSeats].sort(
        (a, b) => (a.cx || 0) - (b.cx || 0)
      );

      let currentNumber = 1;
      let previousX = sortedSeats[0]?.cx;

      sortedSeats.forEach((seat) => {
        if (
          previousX !== undefined &&
          Math.abs((seat.cx || 0) - previousX) > 0.5
        ) {
          currentNumber++;
          previousX = seat.cx;
        }

        updatedSeats.push({
          ...seat,
          r: firstSeatRadius,
          area_id: newArea.id,
          row: rowIndex + 1,
          number: currentNumber,
          label: `${rowIndex + 1}-${currentNumber}`,
        });
      });
    });

    setContours((prevContours: Contour[]): Contour[] => {
      const otherContours = prevContours.filter(
        (contour) => !selectedContours.includes(contour.id)
      );
      return [...otherContours, ...updatedSeats, newArea];
    });
  };

  const convertAllToSeats = () => {
    setContours((prevContours: Contour[]): Contour[] =>
      prevContours.map((contour) => {
        if (contour.type === "contour") {
          const xs = contour.points.map((p) => p.x);
          const ys = contour.points.map((p) => p.y);
          const cx = Math.round((Math.max(...xs) + Math.min(...xs)) / 2);
          const cy = Math.round((Math.max(...ys) + Math.min(...ys)) / 2);

          const calculateSeatRadius = (contour: Contour): number => {
            const { width, height } = contour.boundingBox;
            return Math.min(width, height) / 2;
          };

          return {
            ...contour,
            type: "seat",
            label: "",
            area: 0,
            cx: cx,
            cy: cy,
            r: calculateSeatRadius(contour),
            row: 0,
            number: 0,
          };
        }
        return contour;
      })
    );
    setIsImageVisible(false);
  };

  return (
    <div className="h-full p-6 space-y-4 overflow-auto">
      <Button className="w-full" onClick={convertAllToSeats}>
        좌석 인식
      </Button>
      <Button
        className={`w-full ${editMode ? "bg-black text-white" : "bg-gray-300"}`}
        variant={`${editMode ? "dark" : "secondary"}`}
        onClick={() => {
          setEditMode(!editMode);
          setSelectedContours([]);
        }}
      >
        구역 설정
      </Button>
      {selectedContours.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">구역 이름</label>
            <input
              type="text"
              value={areaLabel}
              onChange={(e) => setAreaLabel(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="구역 이름을 입력하세요"
            />
            <label className="block text-sm font-medium">구역 좌석 가격</label>
            <input
              type="number"
              value={areaPrice}
              onChange={(e) => setAreaPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="구역 가격을 입력하세요"
            />
            <Button
              onClick={() => {
                createAreaFromSelectedSeats();
                setAreaLabel("");
                setAreaPrice(50000);
              }}
              variant="dark"
              disabled={!areaLabel || !areaPrice}
              size="sm"
              className="w-full"
            >
              구역 생성
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverallControlPanel;
