import { z } from "zod";

const bodyResponse = z.object({
  status: z.string(),
  code: z.number(),
  message: z.string(),
});

export const CustomersAPIResponse = z.object({
  ...bodyResponse.shape,
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      rfc: z.string(),
      fiscalAddress: z.string(),
      email: z.string(),
      phone: z.string(),
      contact: z.string(),
      status: z.string(),
    })
  ),
});

export const ShippingAddressesAPIResponse = z.object({
  ...bodyResponse.shape,
  data: z.array(
    z.object({
      id: z.number(),
      customerId: z.number(),
      NameShort: z.string(),
      address: z.string(),
      postalCode: z.string(),
      phone: z.string(),
      contact: z.string(),
      status: z.string(),
    })
  ),
});
