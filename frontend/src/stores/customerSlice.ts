import type { StateCreator } from "zustand";
import type { Customer, CustomerInfoDelivery } from "../types";
import { getCustomers } from "../services/CustomerService";

export type customersSliceType = {
  customers: Customer[];
  fetchCustomers: () => Promise<void>;
  customerInfoDelivery: CustomerInfoDelivery;
  setCustomerInfoDelivery: (customerInfoDelivery: CustomerInfoDelivery) => void;
};

export const createCustomersSlice: StateCreator<customersSliceType> = (
  set
) => ({
  customers: [],
  customerInfoDelivery: {} as CustomerInfoDelivery,
  fetchCustomers: async () => {
    const customers = await getCustomers();
    set({ customers: customers?.data });
  },
  setCustomerInfoDelivery: (customerInfoDelivery: CustomerInfoDelivery) => {
    set({ customerInfoDelivery });
  },
});
