import { EVENT_SERVER_STATIC_PATH } from '../../api/eventApi';
import { fetchErrorMessages } from '../../constants/errorMessages';
import { Order } from '../../types/api/order';
import { formatToKoreanDateAndTime } from '../../utils/dateUtils';

interface ReservationConfirmProps {
  data: Order;
}

const ReservationConfirmationTemplate = ({ data }: ReservationConfirmProps) => {
  if (!data) {
    return <div>{fetchErrorMessages.noReservationData}</div>;
  }
  return (
    <>
      <div className="max-w-3xl mx-auto md:p-10 ">
        <div className="bg-white rounded-md shadow-lg overflow-hidden">
          {/* Header Section with Event Image */}
          <div className="h-36 md:h-[180px]">
            <div className="w-full h-full flex space-x-5 bg-rose-100 p-3  md:p-4 rounded-t-lg">
              <img
                src={`${EVENT_SERVER_STATIC_PATH}/${data.orderEvent.thumbnail}`}
                alt={data.orderEvent.title}
                className="hidden md:block max-w-32 h-full object-cover rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-gray-800 text-xl md:text-3xl p-bold mb-2">
                  {data.orderEvent.title}
                </p>
                <p className="text-gray-700 p-bold mb-1 md:my-2 text-lg md:text-xl">
                  {data.orderEvent.artist}
                </p>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="p-bold">{data.orderMember.memberName}</span>
              </div>
              <div>
                <p className="p-bold text-gray-800">
                  {data.orderMember.memberEmail}
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📅</div>
                <div>
                  <p className="p-bold text-gray-700 mb-1">일시</p>
                  <p className="text-gray-600">
                    {formatToKoreanDateAndTime(data.eventDatetime)}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📍</div>
                <div>
                  <p className="p-bold text-gray-700 mb-1">장소</p>
                  <p className="text-gray-600">{data.orderEvent.place}</p>
                </div>
              </div>

              {/* <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">🎫</div>
                <div>
                  <p className="p-bold text-gray-700 mb-1">좌석</p>
                  <p className="text-gray-600">
                    {data.reservations.map((reservation, index) => (
                      <div key={reservation.seatId || index} className="mb-1">
                        {reservation}구역 {reservation.seatRow}열{" "}
                        {reservation.seatNumber}번
                      </div>
                    ))}
                  </p>
                </div>
              </div> */}
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center block">
                공연 당일 예매내역을 확인할 수 있는 신분증을 지참해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationConfirmationTemplate;
