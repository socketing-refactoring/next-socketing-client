"use client";

import useReservationStore from "../../store/reservation/useReservationStore";
import useMemberStore from "../../store/member/useMemberStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ErrorPage from "../error/page";
import Button from "../../components/common/Button";
import { useRouter } from "next/navigation";
import { formatToKoreanDateAndTime } from "../../utils/event/dateUtils";
import { EVENT_SERVER_STATIC_PATH } from "../../api/eventApi";
import { fetchErrorMessages } from "../../constants/errorMessages";

const OrderPage = () => {
  const router = useRouter();
  const { member } = useMemberStore();
  const { currentTempOrder, selectedSeats, event } = useReservationStore();

  const [isAgreed, setIsAgreed] = useState(false);
  const seats = Array.from(selectedSeats);

  useEffect(() => {
    if (!currentTempOrder) {
      toast.error("주문 데이터가 없습니다!");
    }
  }, [currentTempOrder]);

  const totalAmount = currentTempOrder?.seats
    .map((seat) => seat.areaPrice)
    .reduce((sum, price) => sum + price, 0);

  const handlePayment = async () => {
    if (!isAgreed) {
      toast.error("구매조건 확인 및 결제 진행에 동의해주세요!");
      return;
    }

    router.push("/checkout");
  };

  if (!member)
    return <ErrorPage errorMessage={fetchErrorMessages.noMemberData} />;
  if (!currentTempOrder)
    return <ErrorPage errorMessage={"예매 정보가 없습니다"} />;

  return (
    <div className="bg-gray-100 flex justify-center md:h-full">
      <div className="max-w-4xl py-10 px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">결제 정보</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 왼쪽 */}
          <div className="md:col-span-2 space-y-6">
            {/* 공연 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">공연 티켓 정보</h2>
              <div className="flex items-center">
                <img
                  src={`${EVENT_SERVER_STATIC_PATH}/${event.thumbnail}`}
                  alt="공연 포스터"
                  className="w-24 h-28 rounded-md object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{event.place}</p>
                  <p className="text-gray-600 text-sm mb-1">
                    {formatToKoreanDateAndTime(currentTempOrder.eventDatetime)}
                  </p>
                  <p className="text-gray-600 text-sm">{event.artist}</p>
                </div>
              </div>
              <hr className="my-4" />

              <div className="space-y-3">
                <div>
                  {seats.map((seat) => (
                    <div className="flex justify-between" key={seat.id}>
                      <span>
                        {seat.areaLabel ?? ""}구역 {seat.row}열 {seat.number}번
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 주문자 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">주문자 정보</h2>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.nickname}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 */}
          <div className="space-y-6">
            {/* 최종 결제 금액 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">최종 결제금액</h2>
              <div className="space-y-2 text-sm text-gray-600">
                {seats.map((seat) => (
                  <div className="flex justify-between" key={seat.id}>
                    <span>
                      {seat.areaLabel}구역 {seat.row}열 {seat.number}번
                    </span>
                    <span>{seat.areaPrice}원</span>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-gray-800">
                  <span>총 결제금액</span>
                  <span>{totalAmount}원</span>
                </div>
              </div>
            </div>

            {/* 결제 방법
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">결제 방법</h2>
              <div className="text-sm">
                <input
                  type="radio"
                  id="socket_pay"
                  className="mr-2"
                  name="paymentMethod"
                  onChange={() => setPaymentMethod("socket_pay")}
                />
                <label htmlFor="socket_pay" className="pr-24 md:pr-10">
                  보유 금액
                </label>
                <span className="font-bold">
                  {userPoints.toLocaleString()} 원
                </span>
              </div>
            </div> */}

            {/* 결제 버튼 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="agree"
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <label htmlFor="agree" className="text-sm text-gray-600">
                  구매조건 확인 및 결제 진행에 동의
                </label>
              </div>
              <Button
                onClick={() => {
                  handlePayment();
                }}
                className="text-sm w-full"
              >
                결제하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
