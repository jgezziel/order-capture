import { z } from "zod";

export const Product = z.object({
  id: z
    .number({
      required_error: "This field is required",
    })
    .optional(),
  sku: z
    .string({
      required_error: "SKU is required",
    })
    .min(3, {
      message: "SKU must be at least 3 characters long",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, {
      message: "Description must be at least 10 characters long",
    }),
  measurementUnit: z
    .string({
      required_error: "Measurement Unit is required",
    })
    .max(25, {
      message: "Measurement Unit must be at most 25 characters long",
    }),
  price: z
    .number({
      required_error: "Price is required",
    })
    .max(10, {
      message: "Price must be at most 10 characters long",
    }),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

export type ProductSchema = z.infer<typeof Product>;