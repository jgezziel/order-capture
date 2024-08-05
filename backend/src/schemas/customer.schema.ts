import { z } from "zod";

const Customer = z.object({
  id: z
    .number({
      required_error: "This field is required",
    })
    .optional(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  rfc: z
    .string({
      required_error: "RFC is required",
    })
    .min(12, {
      message: "RFC must be 12 characters long",
    })
    .max(13, {
      message: "RFC must be 13 characters long",
    }),
  fiscalAddress: z
    .string({
      required_error: "Fiscal Address is required",
    })
    .min(10, {
      message: "Fiscal Address must be at least 10 characters long",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(5, {
      message: "Email must be at least 5 characters long",
    })
    .max(100, {
      message: "Email must be at most 100 characters long",
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

export type CustomerSchema = z.infer<typeof Customer>;
