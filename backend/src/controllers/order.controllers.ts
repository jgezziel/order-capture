import type { Request, Response } from "express";
import { orders, customers, shippingAddresses } from "../db/data";

export const OrderController = {
  readOrders: async (_req: Request, res: Response) => {
    const ordersWithCustomerAndShippingAddress = orders.map((order) => {
      const { idCustomer, idShippingAddress } = order;

      const customer = customers.find((customer) => customer.id === idCustomer);
      const shippingAddress = shippingAddresses.find(
        (shippingAddress) => shippingAddress.id === idShippingAddress
      );

      return {
        ...order,
        customer: customer?.name,
        shippingAddress: shippingAddress?.address,
      };
    });

    return res.json({
      status: "success",
      code: 200,
      message: "Orders retrieved",
      data: ordersWithCustomerAndShippingAddress,
    });
  },
  readOrderID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = orders.find((order) => order.id === Number(id));
    const { idCustomer, idShippingAddress } = order || {};

    const customer = customers.find((customer) => customer.id === idCustomer);
    const shippingAddress = shippingAddresses.find(
      (shippingAddress) => shippingAddress.id === idShippingAddress
    );

    const orderWithCustomerAndShippingAddress = {
      ...order,
      customer: customer?.name,
      shippingAddress: shippingAddress?.address,
    };

    if (!order) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Order not found",
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Order retrieved",
      data: orderWithCustomerAndShippingAddress,
    });
  },
};
