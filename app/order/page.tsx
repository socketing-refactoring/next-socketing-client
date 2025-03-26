import { useRouter } from "next/router";
import useOrderStore from "../../store/reservation/useReservationStore";
import useMemberStore from "../../store/member/useMemberStore";
import { useState } from "react";
import { toast } from "react-toastify";
import ErrorPage from "../error/page";
import Button from "../../components/common/Button";
import Image from "next/image";

const OrderPage = () => {
  const router = useRouter();
  const { memberId, memberName } = useMemberStore();
  const { currentTempOrder } = useOrderStore();

  const [isAgreed, setIsAgreed] = useState(false); // 구매 동의 체크박스 상태
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null); // 선택된 결제 방법

  const handlePayment = async () => {
    if (!isAgreed) {
      toast.error("구매조건 확인 및 결제 진행에 동의해주세요!");
      return;
    }
    // if (userPoints === -1) {
    //   toast.error("먼저 보유하신 금액를 조회해주세요!");
    //   return;
    // }
    if (!paymentMethod) {
      toast.error("결제 방법을 선택해주세요!");
      return;
    }

    if (!currentTempOrder) {
      toast.error("주문 데이터가 없습니다!");
      return;
    }

    const totalAmount = currentTempOrder.seats.reduce((seat) => seat.areaId);

    // if (userPoints < totalAmount) {
    //   toast.error("잔액 부족!");
    //   return;
    // }
    // const seatIds = orderData.seats.map((seat) => seat.id);

    // const paymentData: NewPayment = {
    //   orderId: orderData.id,
    //   paymentMethod: paymentMethod as PaymentMethod,
    //   totalAmount,
    //   eventDateId: eventData.eventDates[0].id,
    //   seatIds,
    // };

    // try {
    //   if (!socket || !userId) return;

    //   //const response = await createNewPayment(paymentData);
    //   requestOrder(userId, orderData.id);

    //   // if (response.code === 0) {
    //   //   toast.success("결제가 진행됩니다!");

    //   await queryClient.invalidateQueries({
    //     queryKey: [`my-orders-${userId}`],
    //   }); // orders 쿼리 무효화
    //   socket.on("orderApproved", (response: ApprovedOrderResponse) => {
    //     void navigate(`/reservation-confirmation`, {
    //       state: { paymentData: response.data },
    //     });
    //   });
    // } catch (error) {
    //   console.error("결제 요청 실패:", error);
    //   toast.error("결제 처리 중 오류가 발생했습니다.");
    // }
  };

  if (!memberId) return <ErrorPage />;

  if (!currentTempOrder)
    return <ErrorPage errorMessage={"예매 정보가 없습니다"} />;
  const seats = orderData.seats;

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
                <Image
                  src={eventData.thumbnail}
                  alt="공연 포스터"
                  className="w-24 h-28 rounded-md object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">{eventData.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    {eventData.place}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    {formatToKoreanDateAndTime(eventData.eventDates[0].date)}
                  </p>
                  <p className="text-gray-600 text-sm">{eventData.cast}</p>
                </div>
              </div>
              <hr className="my-4" />

              <div className="space-y-3">
                <div>
                  {seats.map((seat) => (
                    <div className="flex justify-between" key={seat.id}>
                      <span>
                        {orderData.area.label ?? ""}구역 {seat.row}열{" "}
                        {seat.number}번
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
                  {/* <p className="text-sm text-gray-600">
                      {order.user.nickname}
                    </p> */}
                  <p className="text-sm text-gray-600">
                    {storedName}@jungle.com
                  </p>
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
                      {orderData.area.label}구역 {seat.row}열 {seat.number}번
                    </span>
                    <span>{orderData.area.price}원</span>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-gray-800">
                  <span>총 결제금액</span>
                  <span>{orderData.area.price * orderData.seats.length}원</span>
                </div>
              </div>
            </div>

            {/* 결제 방법 */}
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
            </div>

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
                  handlePayment().catch((error) => {
                    console.error("결제 처리 중 오류 발생:", error);
                    toast.error("결제 처리 중 문제가 발생했습니다.");
                  });
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
