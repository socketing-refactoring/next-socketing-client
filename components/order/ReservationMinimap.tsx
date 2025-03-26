import useReservationStore from "../../store/reservation/useReservationStore";

const ReservationMinimap = () => {
  const { areasMap, areaStat } = useReservationStore();

  return (
    <div className="h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-3 pl-2">구역 정보</h2>
      <div className="bg-white rounded-lg md:h-3/4 overflow-y-auto">
        <div className="p-3 space-y-3 text-sm">
          {Array.from(areasMap.values()).map((area) => (
            <div
              key={area.id}
              className="flex items-center w-full justify-between"
            >
              <div className="w-5 h-5 rounded-full border border-gray-400 bg-[#FFF] flex justify-center items-center">
                <div className="text-gray-600 font-bold">{area.label}</div>
              </div>
              <div className="w-20 flex justify-end">
                <div>{area.price} 원</div>
              </div>
              <div className="w-20 flex justify-end">
                <div>
                  {
                    areaStat.filter((stat) => stat.id === area.id)[0]
                      ?.reservedSeatCount
                  }{" "}
                  / {area.seatCount} 석
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationMinimap;
