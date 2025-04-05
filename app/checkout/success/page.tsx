"use client";

import "../../../styles/tosspayment.css";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useOrderCreateMutation } from "../../../hooks/useOrderCreateMutation";
import { toast } from "react-toastify";
import { ApiError } from "next/dist/server/api-utils";
import { Order } from "../../../types/api/order";
import { ApiResponse } from "../../../types/api/common";
import { AxiosError } from "axios";
import LoadingPage from "../../loading/page";

const WidgetSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [setResponseData] = useState(null);

  const { mutate } = useOrderCreateMutation();

  useEffect(() => {
    const orderData = {
      tossOrderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
      eventDatetimeId: searchParams.get("eventDatetimeId"),
      eventId: searchParams.get("eventId"),
      seatIds: JSON.parse(searchParams.get("seats")),
    };

    console.log(orderData);

    if (
      orderData.tossOrderId &&
      orderData.amount &&
      orderData.paymentKey &&
      orderData.eventDatetimeId &&
      orderData.seatIds
    ) {
      console.log("order api request");

      mutate(orderData, {
        onSuccess: (data: ApiResponse<Order>) => {
          setResponseData(data);
          router.push("/order/confirmation");
        },
        onError: (error: AxiosError<ApiError>) => {
          const errorMessage =
            error?.response?.data?.message ||
            "주문 과정에서 오류가 발생했습니다.";
          toast.error(errorMessage);
          router.push(
            `/checkout/fail?code=${error.code}&message=${error.message}`
          );
        },
      });
    }
  }, [searchParams, mutate, router]);

  return (
    <div>
      <div className="box_section" style={{ width: "600px" }}>
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {`${searchParams.get("orderId")}`}
          </div>
        </div>
        {/* <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
            {`${searchParams.get("paymentKey")}`}
          </div>
        </div> */}
        {/* <div className="p-grid-col">
          <Link href="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button className="button p-grid-col5">연동 문서</button>
          </Link>
          <Link href="https://discord.gg/A4fRFXQhRu">
            <button className="button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
              실시간 문의
            </button>
          </Link>
        </div> */}
      </div>
      {/* <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div> */}
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <WidgetSuccessPage />
    </Suspense>
  );
}
