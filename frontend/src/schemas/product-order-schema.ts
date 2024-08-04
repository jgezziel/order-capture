import { z } from "zod";
import { bodyResponse } from "./customer-schema";

export const ProductOrderSchema = z.object({
  id: z.number(),
  idOrder: z.string(),
  idProduct: z.number(),
  quantity: z.number(),
  price: z.number(),
});

export const ProductOrdersAPIResponse = z.object({
  ...bodyResponse.shape,
  data: z.array(ProductOrderSchema),
});
