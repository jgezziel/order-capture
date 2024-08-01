import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createCustomersSlice, type customersSliceType } from "./customerSlice";
import { createProductsSlice, type productsSliceType } from "./productSlice";
import {
  createShippingAddressSlice,
  type shippingAddressSliceType,
} from "./shippingAddressSlice";

export const useAppStore = create<
  customersSliceType & productsSliceType & shippingAddressSliceType
>()(
  devtools((...a) => ({
    ...createCustomersSlice(...a),
    ...createProductsSlice(...a),
    ...createShippingAddressSlice(...a),
  }))
);
