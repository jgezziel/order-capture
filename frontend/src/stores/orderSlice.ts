import type { StateCreator } from "zustand";
import type { PreOrder } from "../types";

export type orderSliceType = {
  preOrder: PreOrder[];
  addPreStore: (preOrder: PreOrder) => void;
};

export const createOrderSlice: StateCreator<orderSliceType> = (set) => ({
  preOrder: [],
  addPreStore: (preOrder: PreOrder) => {
    set((state) => {
      const existingItem = state.preOrder.find(
        (orderItem) => orderItem.idProduct === preOrder.idProduct
      );

      let preOrderList: PreOrder[] = [];

      if (existingItem) {
        preOrderList = state.preOrder.map((orderItem) =>
          orderItem.idProduct === preOrder.idProduct
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        preOrderList = [...state.preOrder, preOrder];
      }

      return { preOrder: preOrderList };
    });
  },
});
