import axios from "axios";
import { ProductsAPIResponse } from "../schemas/product-schema";

export async function getProducts() {
  try {
    const url = "http://localhost:3000/api/v1/products";
    const { data } = await axios(url);

    const result = ProductsAPIResponse.safeParse(data);

    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error(error);
  }
}
