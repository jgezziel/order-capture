import { z } from "zod";

export const bodyResponse = z.object({
  status: z.string(),
  code: z.number(),
  message: z.string(),
});

export const Customer = z.object({
  id: z.number(),
  name: z.string(),
  rfc: z.string(),
  fiscalAddress: z.string(),
  email: z.string(),
  phone: z.string(),
  contact: z.string(),
  status: z.string(),
});

export const CustomersAPIResponse = z.object({
  ...bodyResponse.shape,
  data: z.array(Customer),
});
