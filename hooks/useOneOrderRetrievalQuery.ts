import { ApiResponse } from "../types/api/common";
import { Order } from "../types/api/order";
import { fetchOneOrder } from "../api/orderApi";
import { useQuery } from "@tanstack/react-query";

export const useOneOrderRetrievalQuery = (id: string) => {
  return useQuery<ApiResponse<Order>>({
    queryKey: ["orders", id],
    queryFn: () => fetchOneOrder(id),
    enabled: !!id,
  });
};

export default useOneOrderRetrievalQuery;
