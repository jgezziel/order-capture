import type { StateCreator } from "zustand";
import type { Customer } from "../types";
import { getCustomers } from "../services/CustomerService";

export type customersSliceType = {
  customers: Customer[];
  fetchCustomers: () => Promise<void>;
};

export const createCustomersSlice: StateCreator<customersSliceType> = (
  set
) => ({
  customers: [],
  fetchCustomers: async () => {
    const customers = await getCustomers();
    set({ customers: customers?.data });
  },
});
