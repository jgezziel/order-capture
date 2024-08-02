import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createCustomersSlice, type customersSliceType } from "./customerSlice";
import { createProductsSlice, type productsSliceType } from "./productSlice";
import {
  createShippingAddressSlice,
  type shippingAddressSliceType,
} from "./shippingAddressSlice";
import { createOrderSlice, type orderSliceType } from "./orderSlice";

export const useAppStore = create<
  customersSliceType &
    productsSliceType &
    shippingAddressSliceType &
    orderSliceType
>()(
  devtools((...a) => ({
    ...createCustomersSlice(...a),
    ...createProductsSlice(...a),
    ...createShippingAddressSlice(...a),
    ...createOrderSlice(...a),
  }))
);
