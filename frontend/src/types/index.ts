import type { z } from "zod";

import type { Customer as CustomerShcema } from "../schemas/customer-schema";
import type { Product as ProductSchema } from "../schemas/product-schema";
import type { ShippingAddress as ShippingAddressSchema } from "../schemas/shipping-address-schema";
import type {
  Order as OrderSchema,
  PreOrderSchema,
  productOrderSchema,
} from "../schemas/order-schema";
import type { ProductOrderSchema } from "../schemas/product-order-schema";

export type Customer = z.infer<typeof CustomerShcema>;
export type Product = z.infer<typeof ProductSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type Orders = z.infer<typeof OrderSchema>;
export type ProductOrder = z.infer<typeof ProductOrderSchema>;
export type Order = z.infer<typeof PreOrderSchema>;
export type PreOrder = z.infer<typeof productOrderSchema>;

/*
export type Order = {
  id?: number;
  idOrder: string;
  idCustomer: number;
  idShippingAddress: number;
  preOrder: PreOrder[];
};

export type PreOrder = {
  idProduct: number;
  quantity: number;
  price: number;
};*/
