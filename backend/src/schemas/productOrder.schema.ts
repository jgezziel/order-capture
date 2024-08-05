import { z } from "zod";

export const ProductOrder = z.object({
  id: z
    .number({
      required_error: "This field is required",
    })
    .optional(),
  idOrder: z
    .string({
      required_error: "Order ID is required",
    })
    .min(3, {
      message: "Order ID must be at least 3 characters long",
    }),
  idProduct: z.number({
    required_error: "Product ID is required",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
  }),
  price: z
    .number({
      required_error: "Price is required",
    })
    .max(10, {
      message: "Price must be at most 10 characters long",
    }),
});

export type ProductOrderSchema = z.infer<typeof ProductOrder>;
