import type { Request, Response } from "express";

import { shippingAddresses } from "../db/data";
import { customers } from "../db/data";

export const ShippingAddressController = {
  readShippingAddresses: async (_req: Request, res: Response) => {
    return res.json({
      status: "success",
      code: 200,
      message: "Shipping Addresses retrieved",
      data: shippingAddresses,
    });
  },
  readShippingAddressID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const shippingAddress = shippingAddresses.find(
      (shippingAddress) => shippingAddress.id === Number(id)
    );

    if (!shippingAddress) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Shipping Address not found",
      });
    }

    return res.json({
      status: "success",
      code: 200,
      message: "Shipping Address retrieved",
      data: shippingAddress,
    });
  },
  readShippingAddressCustomerID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = customers.find((customer) => customer.id === Number(id));

    if (!customer) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Customer not found",
      });
    }

    const customerShippingAddresses = shippingAddresses.filter(
      (shippingAddress) => shippingAddress.customerId === customer.id
    );

    if (customerShippingAddresses.length === 0) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Shipping Addresses not found",
      });
    }

    return res.json({
      status: "success",
      code: 200,
      message: "Shipping Addresses retrieved",
      data: customerShippingAddresses,
    });
  },
};
