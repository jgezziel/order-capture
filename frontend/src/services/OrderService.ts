import axios from "axios";
import { OrdersAPIResponse } from "../schemas/order-schema";
import type { Order } from "../types";

export async function getOrders() {
  const url = "http://localhost:3000/api/v1/orders";
  const { data } = await axios(url);

  const result = OrdersAPIResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function saveOrder(order: Order) {
  try {
    const url = "http://localhost:3000/api/v1/orders";
    const { data } = await axios.post(url, order);

    const result = OrdersAPIResponse.safeParse(data);
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error("Error saving order", error);
  }
}
