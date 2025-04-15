import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/orderApi";
import { NewOrder } from "../types/api/order";

export const useOrderCreateMutation = () => {
  return useMutation({
    mutationFn: async (data: NewOrder) => {
      return await createOrder(data);
    },
  });
};
