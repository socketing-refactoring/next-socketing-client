import { useMutation } from 'react-query'
import { createOrder } from '../api/orderApi';
import { AxiosError } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
import { toast } from 'react-toastify';
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