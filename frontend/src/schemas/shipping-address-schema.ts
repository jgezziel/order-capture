import { z } from "zod";
import { bodyResponse } from "./customer-schema";

export const ShippingAddress = z.object({
  id: z.number(),
  customerId: z.number(),
  NameShort: z.string(),
  address: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  contact: z.string(),
  status: z.string(),
});

export const ShippingAddressesAPIResponse = z.object({
  ...bodyResponse.shape,
  data: z.array(ShippingAddress),
});
