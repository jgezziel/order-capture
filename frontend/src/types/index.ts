import type { z } from "zod";

import type { Customer as CustomerShcema } from "../schemas/customer-schema";
import type { Product as ProductSchema } from "../schemas/product-schema";
import type { ShippingAddress as ShippingAddressSchema } from "../schemas/shipping-address-schema";

export type Customer = z.infer<typeof CustomerShcema>;
export type Product = z.infer<typeof ProductSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;

export type Order = {
  id: number;
  idOrder: string;
  idProduct: number;
  quantity: number;
  price: number;
  idCustomer: number;
  idShippingAddress: number;
};
