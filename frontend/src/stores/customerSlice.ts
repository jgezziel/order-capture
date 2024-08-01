import type { StateCreator } from "zustand";
import type { Customer, ShippingAddress } from "../types";
import {
  getCustomers,
  getShippingAddresses,
} from "../services/CustomerService";

export type customersSliceType = {
  customers: Customer[];
  selectedShippingAddresses: ShippingAddress[];
  fetchCustomers: () => Promise<void>;
  selectCustomer: (id: Customer["id"]) => Promise<void>;
};

export const createCustomersSlice: StateCreator<customersSliceType> = (
  set
) => ({
  customers: [],
  selectedShippingAddresses: [],
  fetchCustomers: async () => {
    const customers = await getCustomers();
    set({ customers: customers?.data });
  },
  selectCustomer: async (id) => {
    const selectCustomer = await getShippingAddresses(id);
    set({ selectedShippingAddresses: selectCustomer?.data });
  },
});
