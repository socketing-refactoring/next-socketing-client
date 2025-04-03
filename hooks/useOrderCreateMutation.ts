import { useMutation } from 'react-query'
import { createOrder } from '../api/orderApi';
import { useRouter } from 'next/navigation';
import { NewOrder } from '../types/api/order';

export const useOrderCreateMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: NewOrder) => {
      return await createOrder(data);
    }
  });
}