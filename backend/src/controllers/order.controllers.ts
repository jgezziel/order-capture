import type { Request, Response } from "express";
import { OrderModel } from "../models/Order";

export const OrderController = {
  readOrders: async (_req: Request, res: Response) => {
    const orders = await OrderModel.readOrders();
    if (!orders.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: orders.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Orders retrieved",
      data: orders.orders,
    });
  },
  readOrderID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await OrderModel.readOrderID(id);
    if (!order.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: order.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Order retrieved",
      data: order.order,
    });
  },
  createOrder: async (req: Request, res: Response) => {
    const data = req.body;
    const order = await OrderModel.createOrder(data);
    if (!order.success) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: order.message,
      });
    }
    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Order created",
      data: order.order,
    });
  },
};
