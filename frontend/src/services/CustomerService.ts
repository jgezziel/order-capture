import axios from "axios";
import {
  CustomersAPIResponse,
  ShippingAddressesAPIResponse,
} from "../schemas/customer-schema";
import type { Customer } from "../types";

export async function getCustomers() {
  const url = "http://localhost:3000/api/v1/customers";
  const { data } = await axios(url);

  const result = CustomersAPIResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getShippingAddresses(id: Customer["id"]) {
  const url = `http://localhost:3000/api/v1/shipping-addresses/customer/${id}`;
  const { data } = await axios(url);

  const result = ShippingAddressesAPIResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}
