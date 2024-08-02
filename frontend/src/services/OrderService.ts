import axios from "axios";
import { OrdersAPIResponse } from "../schemas/order-schema";

export async function getOrders() {
  const url = "http://localhost:3000/api/v1/orders";
  const { data } = await axios(url);

  const result = OrdersAPIResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}
