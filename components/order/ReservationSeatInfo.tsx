import useReservationStore from "../../store/reservation/useReservationStore";

const ReservationSeatInfo = () => {
  const { selectedSeats } = useReservationStore();

  return (
    <div className="h-full w-full">
      {/* <div className=""> */}
      {selectedSeats.size && selectedSeats.size > 0 ? (
        <div className="flex flex-col space-y-2 w-full">
          {Array.from(selectedSeats).map((seat) => (
            <div
              key={seat.id}
              className="border p-2 text-gray-800 bg-white rounded-lg text-sm w-full"
            >
              <div className="font-bold text-gray-700 flex justify-center">
                <div className="text-black w-10 flex justify-end">
                  <p>{seat.areaLabel ?? ""}구역</p>
                </div>
                <div className="text-black w-10 flex justify-end">
                  <p>{seat.row}열 </p>
                </div>
                <div className="text-black w-10 flex justify-end">
                  <p>{seat.number}번 </p>
                </div>
                <div className="text-black w-20 flex justify-end">
                  <p>{seat.areaPrice}원 </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          <div>좌석을 선택해주세요</div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default ReservationSeatInfo;
