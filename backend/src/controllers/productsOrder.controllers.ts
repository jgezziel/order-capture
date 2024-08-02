import type { Request, Response } from "express";

import { productsOrders } from "../db/data";

export const ProductsOrderController = {
  readProductsOrders: async (_req: Request, res: Response) => {
    return res.json({
      status: "success",
      code: 200,
      message: "Products orders retrieved",
      data: productsOrders,
    });
  },
  readProductsOrderKey: async (req: Request, res: Response) => {
    const { id } = req.params;

    const allProductsOrders = productsOrders.filter(
      (productsOrder) => productsOrder.idOrder === id
    );

    if (allProductsOrders.length) {
      return res.json({
        status: "success",
        code: 200,
        message: "Products order retrieved",
        data: allProductsOrders,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Products order not found",
    });
  },
};
