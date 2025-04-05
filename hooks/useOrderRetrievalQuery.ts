import { useQuery } from 'react-query';
import { ApiResponse } from '../types/api/common';
import { Order } from '../types/api/order';
import { fetchAllOrdersByMemberId } from '../api/orderApi';

export const useOrderRetrievalQuery = (id: string) => {
  return useQuery<ApiResponse<Order[]>>({
    queryKey: ["all-orders", id],
    queryFn: () => fetchAllOrdersByMemberId(id),
  });
};

export default useOrderRetrievalQuery;