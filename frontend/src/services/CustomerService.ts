import axios from "axios";
import {
  CustomersAPIResponse,
} from "../schemas/customer-schema";

export async function getCustomers() {
  const url = "http://localhost:3000/api/v1/customers";
  const { data } = await axios(url);

  const result = CustomersAPIResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}
