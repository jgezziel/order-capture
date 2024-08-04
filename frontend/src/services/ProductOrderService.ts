import axios from "axios";
import { ProductOrdersAPIResponse } from "../schemas/product-order-schema";
import type { ProductOrder } from "../types";

export async function getProductOrders() {
  try {
    const url = "http://localhost:3000/api/v1/products-orders";
    const { data } = await axios(url);

    const result = ProductOrdersAPIResponse.safeParse(data);
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error("Error fetching product orders", error);
  }
}

export async function getProductOrdersByKey(id: ProductOrder["idOrder"]) {
  try {
    const url = `http://localhost:3000/api/v1/products-orders/${id}`;
    const { data } = await axios(url);

    const result = ProductOrdersAPIResponse.safeParse(data);
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error("Error fetching product orders by key", error);
  }
}

export async function getPDFProductOrdersKey(id: ProductOrder["idOrder"]) {
  try {
    const url = `http://localhost:3000/api/v1/products-orders/pdf/${id}`;
    const data = await axios(url);
    if (data.status === 200) {
      console.log("PDF generado correctamente");
      window.open(url, "_blank");
    } else {
      alert("Error al generar PDF");
    }
  } catch (error) {
    console.error("Error fetching PDF product orders", error);
  }
}

export async function getXMLproductIndex(
  id: ProductOrder["idOrder"],
  index: number
) {
  try {
    const url = `http://localhost:3000/api/v1/products-orders/xml/${id}/${index}`;
    const data = await axios(url);
    if (data.status === 200) {
      console.log("XML generado correctamente");
      window.open(url, "_blank");
    } else {
      alert("Error al generar XML");
    }
  } catch (error) {
    console.error("Error fetching XML product orders", error);
  }
}
