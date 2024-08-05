import type { Request, Response } from "express";
import { ProductModel } from "../models/Product";

export const ProductController = {
  readProducts: async (_req: Request, res: Response) => {
    const products = await ProductModel.readProducts();
    if (!products.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: products.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Products retrieved",
      data: products.products,
    });
  },
  readProductID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await ProductModel.readProductByID(Number(id));
    if (!product.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: product.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Product retrieved",
      data: product.product,
    });
  },
};
