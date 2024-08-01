import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createCustomersSlice, type customersSliceType } from "./customerSlice";

export const useAppStore = create<customersSliceType>()(
  devtools((...a) => ({
    ...createCustomersSlice(...a),
  }))
);
