import { z } from "zod";

const ShippingAddress = z.object({
  id: z
    .number({
      required_error: "This field is required",
    })
    .optional(),
  customerId: z.number({
    required_error: "Customer ID is required",
  }),
  NameShort: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  address: z
    .string({
      required_error: "Address is required",
    })
    .min(10, {
      message: "Address must be at least 10 characters long",
    }),
  postalCode: z
    .string({
      required_error: "Postal Code is required",
    })
    .min(5, {
      message: "Postal Code must be at least 5 characters long",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Phone must be at least 10 characters long",
    })
    .max(10, {
      message: "Phone must be at most 10 characters long",
    }),
  contact: z
    .string({
      required_error: "Contact is required",
    })
    .min(3, {
      message: "Contact must be at least 3 characters long",
    })
    .max(100, {
      message: "Contact must be at most 100 characters long",
    }),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

export type ShippingAddressSchema = z.infer<typeof ShippingAddress>;
