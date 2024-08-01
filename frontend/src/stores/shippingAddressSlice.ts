import type { StateCreator } from "zustand";
import type { Customer, ShippingAddress } from "../types";
import { getShippingAddresses } from "../services/ShippingAddressService";

export type shippingAddressSliceType = {
  shippingAddresses: ShippingAddress[];
  fetchShippingAddresses: (id: Customer["id"]) => Promise<void>;
};

export const createShippingAddressSlice: StateCreator<
  shippingAddressSliceType
> = (set) => ({
  shippingAddresses: [],
  fetchShippingAddresses: async (id) => {
    const shippingAddresses = await getShippingAddresses(id);
    set({ shippingAddresses: shippingAddresses?.data });
  },
});
