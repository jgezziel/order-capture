import type { StateCreator } from "zustand";
import type { Product } from "../types";
import { getProducts } from "../services/ProductService";

export type productsSliceType = {
  products: Product[];
  fetchProducts: () => Promise<void>;
};

export const createProductsSlice: StateCreator<productsSliceType> = (set) => ({
  products: [],
  fetchProducts: async () => {
    const products = await getProducts();
    set({ products: products?.data });
  },
});
