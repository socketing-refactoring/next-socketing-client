"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import LoadingPage from "../../../loading/page";
import ErrorPage from "../../../error/page";
import { fetchErrorMessages } from "../../../../constants/errorMessages";
import Button from "../../../../components/common/Button";
import { toast } from "react-toastify";
import { useOrderCancelMutation } from "../../../../hooks/useOrderCancelMutation";
import { useQueryClient } from "@tanstack/react-query";
import { formatToKoreanDateAndTime } from "../../../../utils/event/dateUtils";
import {
  EVENT_SERVER_STATIC_PATH,
  fetchOneEventDetail,
} from "../../../../api/eventApi";
import useOneOrderRetrievalQuery from "../../../../hooks/useOneOrderRetrievalQuery";
import { DetailedEvent } from "../../../../types/api/event";
import MySeatContainer from "../../../../components/mypage/MySeatContainer";

const MyDetailPage = () => {
  const queryClient = useQueryClient();
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [eventData, setEventData] = useState<DetailedEvent>(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[] | undefined>(
    []
  );

  const { data, isLoading, isError } = useOneOrderRetrievalQuery(orderId);
  const cancelMutation = useOrderCancelMutation();

  const order = data?.data;
  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage errorMessage={fetchErrorMessages.general} />;

  if (!order)
    return <ErrorPage errorMessage={fetchErrorMessages.noReservationData} />;

  // 모달 열기
  const openCancelModal = () => setIsCancelModalOpen(true);
  const openShowModal = async () => {
    setSelectedSeatIds(
      order?.reservations?.map((reservation) => reservation.seatId)
    );
    const eventData = await fetchOneEventDetail(order.orderEvent.id);
    setEventData(eventData.data ?? null);
    console.log(eventData);
    setIsShowModalOpen(true);
  };

  // 모달 닫기
  const closeCancelModal = () => setIsCancelModalOpen(false);
  const closeShowModal = () => setIsShowModalOpen(false);

  // 예매 취소 확인
  const handleCancelReservation = async () => {
    closeCancelModal();
    cancelMutation.mutate(orderId);
    await queryClient.invalidateQueries({
      queryKey: ["all-orders", orderId],
    });
  };

  return (
    <>
      <div className="p-5 md:p-10 overflow-y-auto max-h-[calc(100%-64px)]">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
          {/* Header Section with Event Image */}
          <div className="h-36 md:h-[180px]">
            <div className="w-full h-full flex space-x-5 bg-rose-100 p-3  md:p-4 rounded-t-lg">
              <img
                src={`${EVENT_SERVER_STATIC_PATH}/${order.orderEvent.thumbnail}`}
                alt={order.orderEvent.title}
                className="hidden md:block max-w-32 h-full object-cover rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-gray-800 text-xl md:text-3xl font-bold mb-2">
                  {order.orderEvent.title}
                </p>
                <p className="text-gray-700 font-bold mb-1 md:my-2 text-lg md:text-xl">
                  {order.orderEvent.artist}
                </p>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="p-6 space-y-6">
            {/* User Info */}
            {/* <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="font-bold">
                  {order.orderMember.memberName}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-800">
                  {order.orderMember.memberEmail}
                </p>
              </div>
            </div> */}

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📅</div>
                <div>
                  <p className="font-bold text-gray-700 mb-1">일시</p>
                  <p className="text-gray-600">
                    {formatToKoreanDateAndTime(order.eventDatetime)}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400">📍</div>
                <div>
                  <p className="font-bold text-gray-700 mb-1">장소</p>
                  <p className="text-gray-600">{order.orderEvent.place}</p>
                </div>
              </div>

              <div className="flex space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="w-6 text-gray-400 inline-block ">🎫</div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-gray-700 mb-2">좌석</div>
                    <Button
                      onClick={() => void openShowModal()}
                      variant="dark"
                      size="sm"
                    >
                      좌석 위치 확인
                    </Button>
                  </div>
                  {/* <div className="text-gray-600">
                    {order.reservations?.map((reservation, index) => (
                      <div key={reservation.seatId || index} className="mb-1">
                        {reservation?.seatAreaLabel}구역 {reservation?.seatRow}
                        열 {reservation?.seatNumber}번
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center block">
                공연 당일 예매내역을 확인할 수 있는 신분증을 지참해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 예매 취소 버튼 */}
        <div className="fixed bottom-0 right-8 md:left-0 md:right-0 pb-4  flex justify-center gap-2">
          <Button
            onClick={openCancelModal}
            className={`${order.canceledAt !== null ? "hidden" : ""}`}
          >
            예매 취소
          </Button>
          <Button onClick={() => router.back()} variant="secondary">
            목록으로 가기
          </Button>
        </div>
      </div>
      {/* 모달 */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg mx-8 md:mx-auto p-6 w-96">
            <h2 className="text-xl font-bold mb-4">예매 취소</h2>
            <p className="text-gray-600 mb-6">정말 예매를 취소하시겠습니까?</p>
            <div className="flex justify-end space-x-4">
              <Button
                size="sm"
                onClick={() => {
                  handleCancelReservation().catch((error) => {
                    console.error("취소 처리 중 오류 발생:", error);
                    toast.error("취소 처리 중 문제가 발생했습니다.");
                  });
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                예매 취소
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={closeCancelModal}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                뒤로 가기
              </Button>
            </div>
          </div>
        </div>
      )}
      {isShowModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 md:w-[60vw] md:h-[60vh] relative flex flex-col">
            <h2 className="text-2xl font-bold mb-4">내 좌석 위치</h2>
            <div className="md:max-h-[43vh]">
              <MySeatContainer
                svg={eventData.totalMap}
                areas={eventData.areas}
                selectedSeatIds={selectedSeatIds}
              />
            </div>
            <div className="flex justify-end mt-auto">
              <Button
                size="sm"
                variant="secondary"
                onClick={closeShowModal}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyDetailPage;
