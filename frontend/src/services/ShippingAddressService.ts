import axios from "axios";
import { ShippingAddressesAPIResponse } from "../schemas/shipping-address-schema";
import type { Customer } from "../types";

export async function getShippingAddresses(id: Customer["id"]) {
  const url = `http://localhost:3000/api/v1/shipping-addresses/customer/${id}`;
  const { data } = await axios(url);

  const result = ShippingAddressesAPIResponse.safeParse(data);

  if (result.success) {
    return result.data;
  }
}
