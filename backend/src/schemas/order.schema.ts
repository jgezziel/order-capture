import { z } from "zod";

const Order = z.object({
  id: z
    .number({
      required_error: "This number is required",
    })
    .optional(),
  idOrder: z
    .string({
      required_error: "This idOrder is required",
    })
    .min(3, {
      message: "idOrder must be at least 3 characters long",
    }),
  idCustomer: z.number({
    required_error: "This idCustomer is required",
  }),
  idShippingAddress: z.number({
    required_error: "This idShippingAddress is required",
  }),
  dateOrder: z.string({
    required_error: "This dateOrder is required",
  }),
  status: z.enum(["pending", "completed", "cancelled"]),
});

const productOrder = z.object({
  idProduct: z.number({
    required_error: "This idProduct is required",
  }),
  quantity: z.number({
    required_error: "This quantity is required",
  }),
  price: z.number({
    required_error: "This price is required",
  }),
});

const preOrder = z.object({
  id: z
    .number({
      required_error: "This id is required",
    })
    .optional(),
  idOrder: z.string({
    required_error: "This idOrder is required",
  }),
  idCustomer: z.number({
    required_error: "This idCustomer is required",
  }),
  idShippingAddress: z.number({
    required_error: "This idShippingAddress is required",
  }),
  preOrder: z.array(productOrder),
});

export type OrderSchema = z.infer<typeof Order>;
export type PreOrderSchema = z.infer<typeof preOrder>;
