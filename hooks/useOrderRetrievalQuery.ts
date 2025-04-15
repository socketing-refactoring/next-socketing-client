import { ApiResponse } from "../types/api/common";
import { Order } from "../types/api/order";
import { fetchAllOrdersByMemberId } from "../api/orderApi";
import { useQuery } from "@tanstack/react-query";

export const useOrderRetrievalQuery = (id: string) => {
  return useQuery<ApiResponse<Order[]>>({
    queryKey: ["all-orders", id],
    queryFn: () => fetchAllOrdersByMemberId(id),
    enabled: !!id,
  });
};

export default useOrderRetrievalQuery;
