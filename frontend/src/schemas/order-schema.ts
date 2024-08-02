import { z } from "zod";
import { bodyResponse } from "./customer-schema";

export const Order = z.object({
  id: z.number(),
  idOrder: z.string(),
  idCustomer: z.number(),
  idShippingAddress: z.number(),
  dateOrder: z.string(),
  status: z.string(),
  customer: z.string().optional(),
  shippingAddress: z.string().optional(),
});

export const OrdersAPIResponse = z.object({
  ...bodyResponse.shape,
  data: z.array(Order),
});
