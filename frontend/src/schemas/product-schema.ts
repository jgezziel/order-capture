import { z } from "zod";
import { bodyResponse } from "./customer-schema";

export const Product = z.object({
  id: z.number(),
  sku: z.string(),
  description: z.string(),
  measurementUnit: z.string(),
  price: z.number(),
  status: z.string(),
});

export const ProductsAPIResponse = z.object({
  ...bodyResponse.shape,
  data: z.array(Product),
});
