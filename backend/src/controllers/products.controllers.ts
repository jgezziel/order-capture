import type { Request, Response } from "express";

import { products } from "../db/data";

export const ProductController = {
  readProducts: async (_req: Request, res: Response) => {
    return res.json({
      status: "success",
      code: 200,
      message: "Products retrieved",
      data: products,
    });
  },
  readProductID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === Number(id));
    if (!product) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Product not found",
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Product retrieved",
      data: product,
    });
  },
};
