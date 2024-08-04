import type { StateCreator } from "zustand";
import type { Order, Orders, PreOrder } from "../types";
import { getOrders, saveOrder } from "../services/OrderService";

export type orderSliceType = {
  orders: Orders[];
  fetchOrders: () => Promise<void>;
  preOrder: PreOrder[];
  addPreStore: (preOrder: PreOrder) => void;
  removePreStore: (idProduct: number) => void;
  increaseQuantity: (idProduct: number) => void;
  decreaseQuantity: (idProduct: number) => void;
  saveOrder: (order: Order) => Promise<void>;
};

export const createOrderSlice: StateCreator<orderSliceType> = (set) => ({
  orders: [],
  fetchOrders: async () => {
    const orders = await getOrders();
    set({ orders: orders?.data });
  },
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
  removePreStore: (idProduct: number) => {
    set((state) => {
      const preOrderList = state.preOrder.filter(
        (orderItem) => orderItem.idProduct !== idProduct
      );

      return { preOrder: preOrderList };
    });
  },
  increaseQuantity: (idProduct: number) => {
    set((state) => {
      const preOrderList = state.preOrder.map((orderItem) =>
        orderItem.idProduct === idProduct
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );

      return { preOrder: preOrderList };
    });
  },
  decreaseQuantity: (idProduct: number) => {
    set((state) => {
      const preOrderList = state.preOrder.map((orderItem) => {
        if (orderItem.idProduct === idProduct && orderItem.quantity > 1) {
          return { ...orderItem, quantity: orderItem.quantity - 1 };
        }
        return orderItem;
      });

      return { preOrder: preOrderList };
    });
  },
  saveOrder: async (order: Order) => {
    await saveOrder(order);
    set({ preOrder: [] });
  },
});
